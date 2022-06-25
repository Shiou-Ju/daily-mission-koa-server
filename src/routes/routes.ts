import Router from 'koa-router';
import {
  getSingleMission,
  updateSingleMission,
  getAllMissions,
} from '../controllers/missionsController';

const router = new Router();

router.get('/missions', getAllMissions);
router.get('/missions/:id', getSingleMission);
router.post('/missions/:id', updateSingleMission);

export { router };
