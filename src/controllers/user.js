
import User from "../models/user.js";

//get user
export const getUser = async (req, res) => {

    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if (!user) res.status(404).json({ message: "user not found !" })

        return res.status(200).json(user);
    } catch (error) {
        console.log(error);
        return res.status(501).json({ message: error.message });
    }

}

//get user friends
export const getUserFriends = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);

        if (!user) return res.status(404).json({ message: "enable to friends" })

        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        );

        const formatedUser = friends.map(({ _id, firstName, lastName, occupation, location, picturePath }) => {
            return { _id, firstName, lastName, occupation, location, picturePath };
        });

        return res.status(200).json(formatedUser);

    } catch (error) {
        return res.status(501).json({ message: "server error" })
    }

}

export const addRemoveFriend = async (req, res) => {
    try {
        const { id, friendId } = req.params;
        const user = await User.findById(id);
        const friend = await User.findById(friendId);

        if (user.friends.includes(friendId)) {
            user.friends.filter((id) => {
                return id !== friendId;
            })
            friend.friends.filter((id) => {
                return id !== user;
            })
        } else {
            user.friends.push = friendId;
            friend.friends.push = user;
        }

        const saveUser = await user.save();
        const saveFriend = await friend.save();

        const friends = await Promise.all(
            saveUser.friends.map((id) => User.findById(id))
        );
        const formatedUser = friends.map(({ _id, firstName, lastName, occupation, location, picturePath }) => {
            return { _id, firstName, lastName, occupation, location, picturePath };
        });
        return res.status(202).json(formatedUser)

    } catch (error) {
        return res.status(501).json({ message: "server error" })
    }
}
