import * as requestService from '../services/cvDesginRequest.service.js';
import { asyncHandler } from '../utils/errorHandler.js';

// Create request
export const createRequest = asyncHandler(async (req, res) => {
  const { cvId, message } = req.body;
  const userId = req.user._id; // من التوكن

  const request = await requestService.createDesignRequest(userId, cvId, message);

  res.status(201).json({
    status: 'success',
    data: request,
  });
});

// Get all (admin)
export const getAllRequests = asyncHandler(async (req, res) => {
  const requests = await requestService.getAllRequests();

  res.status(200).json({
    status: 'success',
    data: requests,
  });
});

// Get single
export const getRequest = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const request = await requestService.getRequestById(id);

  res.status(200).json({
    status: 'success',
    data: request,
  });
});

// Get user's requests
export const getUserRequests = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const requests = await requestService.getUserRequests(userId);

  res.status(200).json({
    status: 'success',
    data: requests,
  });
});

// Update (admin)
export const updateRequest = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const updated = await requestService.updateRequest(id, req.body);

  res.status(200).json({
    status: 'success',
    data: updated,
  });
});

// Delete request
export const deleteRequest = asyncHandler(async (req, res) => {
  const { id } = req.params;

  await requestService.deleteRequest(id);

  res.status(200).json({
    status: 'success',
    message: 'Request deleted successfully',
  });
});
