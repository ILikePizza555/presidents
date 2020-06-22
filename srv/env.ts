const VarSessionSecret = "SESSION_SECRET"

export function SessionSecret() {
    const rv = process.env[VarSessionSecret]

    if (!rv) {
        console.warn("[Security] Environment variable SESSION_SECRET is not set. Do not use this in production.")
        return "trans rights are human rights"
    }

    return rv
}