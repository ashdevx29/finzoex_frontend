let env = import.meta.env;
console.log('envenvenv : ', env);
export const SECRET_KEY = {
    'JWT': '4a3927b4b0dd892558f0a3dee7b17d2242c6072e7685a9db357bd1aea9ee83c8',
}

export const GOOGLE = {
    recaptcha: {
        status: 'de-active',
        key: '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'
    }
}

export const link = {
    apiService: {
        main: env.VITE_APISERVICE_MAIN
    },
    siteUrl: env.VITE_VITE_siteUrl || env.VITE_siteUrl,
    adminUrl: env.VITE_adminUrl
}