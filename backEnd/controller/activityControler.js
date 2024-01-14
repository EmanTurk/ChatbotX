import Activity from "../models/activitySchema.js";
import STATUS_CODE from "../constants/statusCodes.js";

export const createActivity = async (req, res, next) => {
  try {
    const { name, description, category, location } = req.body;
    const newActivity = await Activity.create({
      name,
      description,
      category,
      location,
    });
    res.status(STATUS_CODE.CREATED);
    res.send(newActivity);
  } catch (error) {
    next(error);
  }
};

export const getActivityById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const activity = await Activity.findById(id).populate("announcer");
    if (!activity) {
      res.status(STATUS_CODE.NOT_FOUND);
      throw new Error("No such activity in the db");
    }
    res.send(activity);
  } catch (error) {
    next(error);
  }
};

export const getAllActivities = async (req, res, next) => {
  try {
    const activities = await Activity.find({}).populate("annoncer"); // Populate the 'announcer' field
    res.status(STATUS_CODE.OK);
    res.send(activities);
  } catch (error) {
    next(error);
  }
};
// check if the volunteer activity is announced by more than one
export const announcedActivity = async (req, res, next) => {
  try {
    const { userId } = req.body;
    const { activityId } = req.params;
    const activity = await Activity.findById(activityId);
    if (activity.announcer) {
      res.status(STATUS_CODE.CONFLICT);
      throw new Error("Activity already has been announced");
    }
    const user = await User.findByIdAndUpdate(
      userId,
      { $push: { activities: activityId } },
      { new: true }
    ).populate("activities");

    if (!user) {
      res.status(STATUS_CODE.NOT_FOUND);
      throw new Error("No such user in the db");
    }
    activity.announcer = userId;
    await activity.save();
    res.send(user);
  } catch (error) {
    next(error);
  }
};

// update activity satus

export const updateActivity = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, description, category, location } = req.body;
    if (!isValidObjectId(id)) {
      throw new Error("ID not Valid");
    }
    const activity = await Activity.findById(id);

    //does the activity exist ?
    if (!activity) {
      res.status(404);
      throw new Error("Activity not found");
    }
    //edit the activity
    activity.name = name;
    activity.location = location;
    activity.category = category;
    activity.description = description;

    const updateActivity = await activity.save();
    //send it back
    res.send(updateActivity);
  } catch (error) {
    next(error);
  }
};
// Controller to delete an activity by id
export const deleteActivity = async (req, res, next) => {
  try {
    const { activityId } = req.params;

    // Find the activity to get the onnouncer's information
    const activity = await Activity.findById(carId);
    if (!activity) {
      res.status(STATUS_CODE.NOT_FOUND);
      throw new Error("No such activity in the db");
    }

    // If the car has an owner, remove the car from the owner's list
    if (activity.owner) {
      await User.findByIdAndUpdate(activity.owner, {
        $pull: { activities: activity._id },
      });
    }

    // Delete the car from the store
    await Activity.deleteOne({ _id: activity._id });

    res.send(`Car with id ${activityId} was deleted successfully`);
  } catch (error) {
    next(error);
  }
};
