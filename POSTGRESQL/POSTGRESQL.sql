-- CRACION DE LA BASE DE DATOS

CREATE TABLE Usuario (
    Id SERIAL PRIMARY KEY,
    Nombre VARCHAR(255) NOT NULL,
    CorreoElectronico VARCHAR(255) UNIQUE NOT NULL,
    Contrasena VARCHAR(255) NOT NULL,
    Rol VARCHAR(50) CHECK (Rol IN ('ADMINISTRADOR', 'AUXILIARDEREGISTRO')) NOT NULL
);

CREATE TABLE Comerciante (
    Id SERIAL PRIMARY KEY,
    NombreRazonSocial VARCHAR(255) NOT NULL,
    Municipio VARCHAR(255) NOT NULL,
    Telefono VARCHAR(20),
    CorreoElectronico VARCHAR(255),
    FechaRegistro DATE NOT NULL DEFAULT CURRENT_DATE,
    Estado VARCHAR(10) CHECK (Estado IN ('ACTIVO', 'INACTIVO')) NOT NULL,
    FechaActualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UsuarioId INTEGER REFERENCES Usuario(Id),
    CONSTRAINT FkUsuario FOREIGN KEY (UsuarioId) REFERENCES Usuario(Id)
);

CREATE TABLE Establecimiento (
    Id SERIAL PRIMARY KEY,
    NombreEstablecimiento VARCHAR(255) NOT NULL,
    Ingresos DECIMAL(10, 2) CHECK (Ingresos >= 0) NOT NULL,
    NumEmpleados INTEGER NOT NULL CHECK (NumEmpleados >= 0),
    ComercianteId INTEGER REFERENCES Comerciante(Id),
    FechaActualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    UsuarioId INTEGER REFERENCES Usuario(Id),
    CONSTRAINT FkComerciante FOREIGN KEY (ComercianteId) REFERENCES Comerciante(Id),
    CONSTRAINT FkUsuarioEstablecimiento FOREIGN KEY (UsuarioId) REFERENCES Usuario(Id)
);

-- TRIGGERS

CREATE OR REPLACE FUNCTION UpdateComerciante()
RETURNS TRIGGER AS $$
BEGIN
    NEW.FechaActualizacion := CURRENT_TIMESTAMP;
    NEW.UsuarioId := NEW.UsuarioId;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER ComercianteTrigger
BEFORE INSERT OR UPDATE ON Comerciante
FOR EACH ROW
EXECUTE FUNCTION UpdateComerciante();

CREATE OR REPLACE FUNCTION UpdateEstablecimiento()
RETURNS TRIGGER AS $$
BEGIN
    NEW.FechaActualizacion := CURRENT_TIMESTAMP;
    NEW.UsuarioId := NEW.UsuarioId;  
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER EstablecimientoTrigger
BEFORE INSERT OR UPDATE ON Establecimiento
FOR EACH ROW
EXECUTE FUNCTION UpdateEstablecimiento();

-- CREACION DE REGISTROS

INSERT INTO Usuario (Nombre, CorreoElectronico, Contrasena, Rol) VALUES
('Administrador', 'admin@admin.com', '123', 'ADMINISTRADOR'),
('Auxiliar', 'auxiliar@auxiliar.com', '123', 'AUXILIARDEREGISTRO');

INSERT INTO Comerciante (NombreRazonSocial, Municipio, Telefono, CorreoElectronico, FechaRegistro, Estado, UsuarioId) VALUES
('Comerciante1', 'Medellín', '321654987', 'Comerciante1@Comerciante1.com', CURRENT_DATE, 'ACTIVO', 1),
('Comerciante2', 'Cali', '321654987', 'Comerciante2@Comerciante2.com', CURRENT_DATE, 'ACTIVO', 1),
('Comerciante3', 'Barranquilla', '321654987', 'Comerciante3@Comerciante3.com', CURRENT_DATE, 'ACTIVO', 2),
('Comerciante4', 'Bogotá', '321654987', 'Comerciante3@Comerciante3.com', CURRENT_DATE, 'INACTIVO', 2),
('Comerciante5', 'Cartagena', '321654987', 'Comerciante3@Comerciante3.com', CURRENT_DATE, 'ACTIVO', 1);

INSERT INTO Establecimiento (NombreEstablecimiento, Ingresos, NumEmpleados, ComercianteId, FechaActualizacion, UsuarioId) VALUES
('Establecimiento1', 10000.50, 5, 1, CURRENT_TIMESTAMP, 1),
('Establecimiento2', 20000.75, 8, 1, CURRENT_TIMESTAMP, 1),
('Establecimiento3', 15000.00, 6, 2, CURRENT_TIMESTAMP, 1),
('Establecimiento4', 12000.00, 4, 3, CURRENT_TIMESTAMP, 2),
('Establecimiento5', 8000.00, 3, 3, CURRENT_TIMESTAMP, 2),
('Establecimiento6', 5000.00, 3, 4, CURRENT_TIMESTAMP, 2),
('Establecimiento7', 12000.00, 5, 4, CURRENT_TIMESTAMP, 2),
('Establecimiento8', 18000.20, 7, 5, CURRENT_TIMESTAMP, 1),
('Establecimiento9', 22000.30, 10, 5, CURRENT_TIMESTAMP, 1),
('Establecimiento10', 25000.00, 12, 5, CURRENT_TIMESTAMP, 1);