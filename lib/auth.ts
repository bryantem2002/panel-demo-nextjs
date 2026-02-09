/**
 * ========================================
 * AUTH DEMO - Sistema de autenticación simulada
 * ========================================
 * 
 * Este archivo contiene funciones de autenticación SOLO para demo.
 * NO usar en producción. Reemplazar con auth real cuando corresponda.
 * 
 * Para eliminar: Borrar este archivo y reemplazar las llamadas
 * con tu sistema de autenticación real.
 */

// Usuario demo hardcodeado
const DEMO_USER = {
    email: "demo@textilpos.com",
    password: "123456",
    name: "Usuario Demo",
    role: "Administrador"
}

// Clave para localStorage
const SESSION_KEY = "textil_pos_demo_session"

// Tipos
export interface DemoUser {
    name: string
    email: string
    role: string
}

export interface DemoSession {
    isAuthenticated: boolean
    user: DemoUser | null
}

/**
 * Intenta iniciar sesión con las credenciales demo
 * @param email - Email ingresado
 * @param password - Contraseña ingresada
 * @returns { success: boolean, error?: string }
 */
export function loginDemo(email: string, password: string): { success: boolean; error?: string } {
    // Validar credenciales contra usuario demo
    if (email === DEMO_USER.email && password === DEMO_USER.password) {
        // Crear sesión simulada
        const session: DemoSession = {
            isAuthenticated: true,
            user: {
                name: DEMO_USER.name,
                email: DEMO_USER.email,
                role: DEMO_USER.role
            }
        }

        // Guardar en localStorage
        if (typeof window !== "undefined") {
            localStorage.setItem(SESSION_KEY, JSON.stringify(session))
        }

        return { success: true }
    }

    return { success: false, error: "Credenciales incorrectas" }
}

/**
 * Cierra la sesión demo
 * Limpia localStorage y retorna la ruta de redirección
 */
export function logout(): void {
    if (typeof window !== "undefined") {
        localStorage.removeItem(SESSION_KEY)
    }
}

/**
 * Obtiene la sesión actual
 * @returns DemoSession - Sesión actual o sesión vacía
 */
export function getSession(): DemoSession {
    if (typeof window === "undefined") {
        return { isAuthenticated: false, user: null }
    }

    try {
        const stored = localStorage.getItem(SESSION_KEY)
        if (stored) {
            return JSON.parse(stored) as DemoSession
        }
    } catch {
        // Si hay error al parsear, retornar sesión vacía
    }

    return { isAuthenticated: false, user: null }
}

/**
 * Verifica si hay una sesión activa
 * @returns boolean
 */
export function isAuthenticated(): boolean {
    return getSession().isAuthenticated
}

/**
 * Obtiene el usuario actual
 * @returns DemoUser | null
 */
export function getCurrentUser(): DemoUser | null {
    return getSession().user
}
