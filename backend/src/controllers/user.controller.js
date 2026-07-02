import { User } from "../models/user.model.js"//conntrollers handle the requests basically, they are the decision maker

export const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields required" })
        }

        //check if user exist
        const existing = await User.findOne({ email: email.toLowerCase() });
        if (existing) {
            return res.status(400).json({ message: "email already exists!" });
        }

        // create user
        const user = await User.create({
            username,
            email: email.toLowerCase(),
            password,
            loggedIn: false,
        });

        res.status(201).json({
            message: "User registered",
            user: { id: user._id, email: user.email, username: user.username }
        })

    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

const loginUser = async (req, res) => {
    try {
        //checking if the user already exist
        const { email, password } = req.body

        const user = await User.findOne({
            email: email.toLowerCase()
        });

        if (!user) return res.status(400).json({
            message: "user not found"
        });

        //comapre password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) return res.status(400).json({
            message: "Invalid credentials"
        })

        return res.status(200).json({
            message: "user Logged in",
            user: {
                id: user._id,
                email: user.email,
                username: user.username
            }
        })

    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        })
    }
}

const logoutUser = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({
            email
        });

        if (!user) return res.status(404).json({
            message: "User not found"
        });

        res.status(200).json({
            message: "Logout sucessful"
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
}

export {
    logoutUser,
    loginUser
};
