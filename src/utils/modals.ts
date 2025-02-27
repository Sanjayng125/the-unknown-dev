import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
});

const myProjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    github: {
        type: String,
        default: "",
    },
    img: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    visitUrl: {
        type: String,
        default: "",
    }
});

const mySkillsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    logoUrl: {
        type: String,
        default: ""
    }
})

const detailsSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    welcomeMsg: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    sub: {
        type: String,
        required: true,
    },
})

const contactsSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    linkedin: {
        type: String,
    },
    twitter: {
        type: String,
    },
    github: {
        type: String,

    },
    instagram: {
        type: String,

    },
})

const visitCountSchema = new mongoose.Schema({
    count: {
        type: Number,
        required: true
    }
})

export const User = mongoose.models?.User || mongoose.model("User", userSchema)
export const MyProject = mongoose.models?.MyProject || mongoose.model("MyProject", myProjectSchema)
export const MySkills = mongoose.models?.MySkills || mongoose.model("MySkills", mySkillsSchema)
export const Details = mongoose.models?.Details || mongoose.model("Details", detailsSchema)
export const MyContacts = mongoose.models?.Contacts || mongoose.model("Contacts", contactsSchema)
export const MyVisitCount = mongoose.models?.VisitCount || mongoose.model("VisitCount", visitCountSchema)
