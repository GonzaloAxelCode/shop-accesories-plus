export interface Inventario {
    id: number
    producto: number;
    tienda: number;
    cantidad: number;
    stock_minimo: number;
    stock_maximo: number;
    costo: number;
    fecha_actualizacion: Date;
    activo: boolean;
    lote: string;
    fecha_vencimiento?: Date | null;
    estado: string;
    proveedor: number | any
    responsable: number | any
    descripcion: string
}

export type InventarioCreate = Omit<Inventario, 'id' |
    'fecha_actualizacion' |
    'activo' |
    'estado' |
    'lote'>;

