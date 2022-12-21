import privateClient from "../client/private.client";
import publicClient from "../client/public.client";

const userEndpoints = {
    signin: "user/signin",
    signup: "user/signup",
    getInfo: "user/info",
    passwordUpdate: "user/password-update",
};

const userApi = {
    signin: async ({ username, password }) => {
        try {
            const response = await publicClient.post(userEndpoints.signin, {
                username,
                password,
            });

            return { response: response };
        } catch (err) {
            return { err: err };
        }
    },
    signup: async ({ username, displayName, password, confirmPassword }) => {
        try {
            const response = await publicClient.post(userEndpoints.signup, {
                username,
                displayName,
                password,
                confirmPassword,
            });

            return { response: response };
        } catch (err) {
            return { err };
        }
    },
    getInfo: async () => {
        try {
            const response = await privateClient.get(userEndpoints.getInfo);

            return { response };
        } catch (err) {
            return { err };
        }
    },

    passwordUpdate: async ({ password, newPassword, confirmNewPassword }) => {
        try {
            const response = await privateClient.put(
                userEndpoints.passwordUpdate,
                {
                    password,
                    newPassword,
                    confirmNewPassword,
                }
            );

            return { response };
        } catch (err) {
            return { err };
        }
    },
};

export default userApi;
