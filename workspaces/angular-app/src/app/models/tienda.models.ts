export interface Tienda {
    nombre: string;
    direccion: string;
    ciudad: string;
    telefono: string;
    activo: boolean;
    encargadoId?: number | null;
    capacidad: number;
    ruc: string;
    imagen?: string | null;
}