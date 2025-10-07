CREATE TYPE RESULT AS ENUM (
    'WIN',
    'LOSS',
    'DRAW',
    'NOT_PLAYED'
);

CREATE TYPE AGERANGE AS ENUM (
    'u18',
    '18to64',
    '65up'
);

CREATE TABLE "OntarioOpenPlayer" (
    "CFCId" int PRIMARY KEY,
    "rating" int NOT NULL,
    "firstName" varchar(255) NOT NULL,
    "lastName" varchar(255) NOT NULL,
    "email" varchar(255) NOT NULL,
    "ageRange" AGERANGE NOT NULL,
    "isFemale" boolean NOT NULL,
    "isPlayingUp" boolean NOT NULL,
    "hasPaid" boolean DEFAULT FALSE,
    "FIDERating" int,
    "FIDETitle" varchar(255)
);

CREATE TABLE "OntarioOpenStanding" (
    section varchar(20) PRIMARY KEY,
    pairings jsonb DEFAULT '[]'
);

