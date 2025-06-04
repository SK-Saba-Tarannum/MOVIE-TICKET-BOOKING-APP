import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

import * as managerService from '../services/manager.service.js';
// const managerService = require('../services/manager.service');
import { findManagerByEmail } from '../services/manager.service.js';

export const createManager = async (req, res) => {
    try {
      const { fullName, email, phone, theatreName } = req.body;
      console.log("About to insert manager:", { fullName, email, phone, theatreName });

      const manager = await managerService.createManagerService({
          data: {
            fullName,
            email,
            phone,
            theatreName,
          }});
        console.log(manager)  
      res.status(201).json(manager);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create manager' });
    }
  };
  
  export const getAllManagers = async (req, res) => {
    try {
      const managers = await managerService.getAllManagers();
      res.json(managers);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch managers' });
    }
  };
  
    export const updateManager = async (req, res) => {
    try {
      const updated = await managerService.updateManager(parseInt(req.params.id), req.body);
      res.json(updated);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update manager' });
    }
  };
  
  export const deleteManager = async (req, res) => {
    try {
      await managerService.deleteManager(parseInt(req.params.id));
      res.json({ message: 'Manager deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete manager' });
    }
  };



// export const verifyManager = async (req, res) => {
//   try {
//     const { role, email } = req.user;

//     if (role !== 'MANAGER') {
//       return res.status(403).json({ message: 'Access denied: Not a manager' });
//     }

//     const manager = await findManagerByEmail(email);

//     if (!manager) {
//       return res.status(404).json({ message: 'No manager record found in database' });
//     }

//     return res.status(200).json({
//       message: `Verified: Manager ${manager.fullName} of ${manager.theatreName}`,
//       manager,
//     });
//   } catch (error) {
//     console.error('Manager verification error:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };



export const verifyManager = async (req, res) => {
  try {
    console.log(">> VERIFY MANAGER CALLED");
    console.log("req.user:", req.user);

    const { role, email } = req.user || {};

    if (!email || !role) {
      return res.status(400).json({ message: 'Invalid token payload: missing email or role' });
    }

    if (role !== 'MANAGER') {
      return res.status(403).json({ message: 'Access denied: Not a manager' });
    }

    const manager = await findManagerByEmail(email);
    if (!manager) {
      return res.status(404).json({ message: 'No manager record found in database' });
    }

    return res.status(200).json({
      message: `Verified: Manager ${manager.fullName} of ${manager.theatreName}`,
      manager,
    });
  } catch (error) {
    console.error('Manager verification error:', error); // This is what you're hitting now
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};
