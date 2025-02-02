export const login = async (email: string, password: string) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });
        const data = await res.json();

        return data;
    } catch (error) {
        console.log(error);
        return { error: "Something went wrong while logging in!" };
    }
}

export const editDetails = async (name: string, welcomeMsg: string, sub: string) => {
    if (!name || !welcomeMsg || !sub) {
        return { message: "All fiedls are required!", success: false }
    }

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/details`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, welcomeMsg, sub }),
        });
        const data = await res.json();

        if (!data.success) {
            return { message: data?.message || "Cannot update details!", success: false }
        }

        return { message: "Details updated!", success: true, details: data.details }
    } catch (error) {
        console.log(error);
        return { message: "Something went wrong while updating details!", success: false }
    }
}

export const addProject = async (name: string, github: string, img: string, visitUrl: string = "", description: string) => {
    if (!name || !github || !img || !description) {
        return { message: "All fiedls are required!", success: false }
    }

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/project`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, github, img, visitUrl, description }),
        });
        const data = await res.json();

        if (!data.success) {
            return { message: data?.message || "Cannot add project!", success: false }
        }

        return { message: "Project added!", success: true }
    } catch (error) {
        console.log(error);
        return { message: "Something went wrong while adding project!", success: false }
    }
}

export const removeProject = async (id: string) => {
    if (!id) {
        return { message: "All fiedls are required!", success: false }
    }

    try {

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/project`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id }),
        });

        const data = await res.json();

        if (!data.success) {
            return { message: data?.message || "Cannot remove project!", success: false }
        }

        return { message: "Project removed!", success: true }
    } catch (error) {
        console.log(error);
        return { message: "Something went wrong while removing project!", success: false }
    }
}

export const addSkill = async (name: string, logoUrl: string = "") => {
    if (!name) {
        return { message: "All fiedls are required!", success: false }
    }

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/skill`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, logoUrl }),
        });

        const data = await res.json()

        if (!data?.success) {
            return { message: data?.message || "Cannot add skill!", success: false }
        }

        return { message: "Skill added!", success: true }
    } catch (error) {
        console.log(error);
        return { message: "Something went wrong while adding skill!", success: false }
    }
}

export const removeSkill = async (id: string) => {
    if (!id) {
        return { message: "All fiedls are required!", success: false }
    }

    try {

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/skill`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id }),
        });

        const data = await res.json()

        if (!data?.success) {
            return { message: data?.message || "Cannot remove skill!", success: false }
        }

        return { message: "Skill removed!", success: true }
    } catch (error) {
        console.log(error);
        return { message: "Something went wrong while removing skill!", success: false }
    }
}

export const updateContacts = async (linkedin: string = "", twitter: string = "", github: string = "", instagram: string = "") => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contacts`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ linkedin, twitter, github, instagram }),
        });

        const data = await res.json()

        if (!data.success) {
            return { message: data?.message || "Cannot update contacts!", success: false }
        }

        return { message: "Contacts updated!", success: true, contacts: data.contacts }
    } catch (error) {
        console.log(error);
        return { message: "Something went wrong while updating contacts!", success: false }
    }
}

export const getMyDetails = async () => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/details`)

        const data = await res.json()

        if (data?.success) {
            return { details: { name: data.details.name, welcomeMsg: data.details.welcomeMsg, sub: data.details.sub }, success: true }
        }

        return { success: false }
    } catch (error) {
        console.log(error);
        return { message: "Something went wrong while getting details!", success: false }
    }
}

export const getMyProjects = async () => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/project`)

        const data = await res.json()

        return { projects: data.projects || [], success: true }
    } catch (error) {
        console.log(error);
        return { message: "Something went wrong while getting projects!", success: false }
    }
}

export const getMySkills = async () => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/skill`)

        const data = await res.json()

        return { skills: data.skills || [], success: true }
    } catch (error) {
        console.log(error);
        return { message: "Something went wrong while getting skills!", success: false }
    }
}

export const getMyContacts = async () => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contacts`)

        const data = await res.json()

        if (data?.success) {
            return { contacts: data.contacts, success: true }
        }

        return { success: false }
    } catch (error) {
        console.log(error);
        return { message: "Something went wrong while getting contacts!", success: false }
    }
}