import Place from '../models/Place.js';

const showuserplacescontroller = async (req, res) => {
    const { id } = req.params;

    try {
        const place = await Place.findById(id);

        if (!place) {
            return res.status(404).json({ message: "Place not found" });
        }

        return res.json(place);
    } catch (err) {
        console.error("Error fetching place:", err);
        return res.status(500).json({ message: "Something went wrong", error: err.message });
    }
};

export { showuserplacescontroller };
