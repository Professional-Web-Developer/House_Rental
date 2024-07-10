import User from '../models/User.js';

const deleteusercontroller = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        await User.findByIdAndDelete(req.params.id);
        res.cookie('token','').json(true)

        // res.status(200).json({ message: "User deleted successfully" });
    } catch (err) {
        console.error("Error deleting user:", err);
        res.status(500).json({ message: "Something went wrong", error: err.message });
    }
};

export { deleteusercontroller };
