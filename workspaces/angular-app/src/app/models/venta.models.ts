export interface Venta {
    clienteId?: number | null;
    usuarioId?: number | null;
    tiendaId?: number | null;
    fechaVenta: Date;
    fechaRealizacion?: Date | null;
    fechaCancelacion?: Date | null;
    total: number;
    metodoPago: string;
    estado: string;
    descuento: number;
    impuestos: number;
    notas?: string | null;
    factura?: string | null;
}

export interface DetalleVenta {
    ventaId: number;
    productoId?: number | null;
    cantidad: number;
    precioUnitario: number;
    subtotal: number;
    descuento: number;
    impuestos: number;
    notas?: string | null;
    estado: string;
    activo: boolean;
}
