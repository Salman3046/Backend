require("dotenv").config();
import {
  successResponse,
  errorResponse,
  failResponse,
} from "../../helpers/responce";

import { v4 as uuid } from "uuid";

import * as rolesPerm from "../../funcs/admin/rolesPermissions.funcs";

export const addRole = async (req, res) => {
  try {
    const { name, permissions } = req.body;
    const Sresponse = await rolesPerm.addRole(name, permissions);
    return successResponse(req, res, Sresponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const deleteRole = async (req, res) => {
  try {
    const { id } = req.body;
    const Sresponse = await rolesPerm.deleteRole(id);
    return successResponse(req, res, Sresponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const addRolePermissions = async (req, res) => {
  try {
    const { name, roleId } = req.body;
    const Sresponse = await rolesPerm.addRolePermissions(name, roleId);
    return successResponse(req, res, Sresponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const assignRole = async (req, res) => {
  try {
    const { role, email } = req.body;
    const Sresponse = await rolesPerm.assignRole(role, email);
    return successResponse(req, res, Sresponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getAllRoles = async (req, res) => {
  try {
    //const { name } = req.body;
    const Sresponse = await rolesPerm.getAllRoles();
    return successResponse(req, res, Sresponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getRolesWithPermissions = async (req, res) => {
  try {
    //const { name } = req.body;
    const Sresponse = await rolesPerm.getRolesWithPermissions();
    return successResponse(req, res, Sresponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const editRole = async (req, res) => {
  try {
    const { id, name, permissions } = req.body;
    const Sresponse = await rolesPerm.editRole(
      id,
      name,
      permissions
    );
    return successResponse(req, res, Sresponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};
