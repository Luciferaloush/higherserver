import CV from '../models/Cv.js';
import User from '../models/User.js';
import { createDirectNotification } from './notification.service.js';
import { getMessaging } from '../config/firebase.js';

export const matchJobWithCVs = async (job) => {
  const keywords = [
    job.title,
    ...(job.tags || []),
  ].flatMap(k => k.split(',')).map(k => k.toLowerCase());

  const cvs = await CV.find({ visibility: 'public' })
    .populate('userId');

  const matchedUsers = [];

  for (const cv of cvs) {
    // ⛔ تجاهل أي CV بدون user
    if (!cv.userId || !cv.userId._id) continue;

    let score = 0;

    // -------- SKILLS MATCH -------- //
    if (cv.sections?.skills) {
      cv.sections.skills.forEach(skill => {
        if (keywords.some(k => skill.toLowerCase().includes(k))) {
          score += 2;
        }
      });
    }

    // -------- EXPERIENCE MATCH -------- //
    if (cv.sections?.experience) {
      cv.sections.experience.forEach(exp => {
        if (keywords.some(k => exp.position?.toLowerCase().includes(k))) {
          score += 2;
        }
      });
    }

    // -------- EDUCATION MATCH -------- //
    if (cv.sections?.education) {
      cv.sections.education.forEach(edu => {
        if (keywords.some(k => edu.fieldOfStudy?.toLowerCase().includes(k))) {
          score += 1;
        }
      });
    }

    if (score >= 3) {
      matchedUsers.push({
        user: cv.userId,
        score,
      });
    }
  }

  return matchedUsers;
};
