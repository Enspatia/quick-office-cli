import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import axios from 'axios';
import { ${modelName} } from '../../models';
import { successResponse, errorResponse, uniqueId, sendMail } from '../../helpers';

export const all = async (req, res) => {};

export const one = async (req, res) => {};

export const create = async (req, res) => {};

export const update = async (req, res) => {};

export const remove = async (req, res) => {
  try {
    let ${name} = await ${modelName}.findOne({ where: { id: req.body.id } });

    if (!${name}) {
      return errorResponse(req, res, '${modelName} with ID : ' + req.body.id + ' NOT FOUND!', 404,);
    }

    ${name} = await ${modelName}.destroy({ where: { id: ${name}.id } });
    return successResponse(req, res, ${name});
  } catch (error) {
    return errorResponse(req, res, error.message, 404);
  }
};
