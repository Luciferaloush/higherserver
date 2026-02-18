import CVDESGINREQUEST from '../models/CvDesginRequest.js';
import { AppError } from '../utils/errorHandler.js';
import fs from 'fs';
import path from 'path'

export const createDesignRequest = async(userId, cvId, message) => {
          const request = CVDESGINREQUEST.create({
                    userId,
                    cvId,
                    message
          });
          return request;
}

// Get all requests for admin
export const getAllRequests = async () => {
  return await CVDESGINREQUEST.find()
    .populate('userId', 'name email')
    .populate('cvId');
};

export const getRequestById = async (id) => {
  const req = await CVDESGINREQUEST.findById(id)
    .populate('userId', 'name email')
    .populate('cvId');

  if (!req) throw new AppError('Request not found', 404);

  return req;
};
// Get requests for a specific user
export const getUserRequests = async (userId) => {
  return await CVDESGINREQUEST.find({ userId }).populate('cvId');
};
// Update request status or notes
export const updateRequest = async (id, data) => {
  const req = await CVDESGINREQUEST.findByIdAndUpdate(id, data, {
    new: true,
  });

  if (!req) throw new AppError('Request not found', 404);

  return req;
};

// Delete request
export const deleteRequest = async (id) => {
  const req = await CVDESGINREQUEST.findByIdAndDelete(id);

  if (!req) throw new AppError('Request not found', 404);

  return req;
};

