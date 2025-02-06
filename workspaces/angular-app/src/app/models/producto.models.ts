export interface Producto {
    nombre: string;
    descripcion?: string | null;
    precio: number;
    categoriaId?: number | null;
    sku: string;
    marca?: string | null;
    modelo?: string | null;
    caracteristicas: Record<string, any>;
    fechaCreacion: Date;
    fechaActualizacion: Date;
    activo: boolean;
    proveedorId?: number | null;
}
