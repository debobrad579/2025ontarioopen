CREATE TYPE RESULT AS ENUM ('WIN', 'LOSS', 'DRAW', 'NOT_PLAYED');
CREATE TYPE AGERANGE AS ENUM ('u18', '18to64', '65up');

CREATE TABLE "OntarioOpenPlayer" (
    "CFCId" INT PRIMARY KEY,
    "rating" INT NOT NULL,
    "firstName" VARCHAR(255) NOT NULL,
    "lastName" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "ageRange" AGERANGE NOT NULL,
    "isFemale" BOOLEAN NOT NULL,
    "isPlayingUp" BOOLEAN NOT NULL,
    "hasPaid" BOOLEAN DEFAULT FALSE,
    "FIDERating" INT,
    "FIDETitle" VARCHAR(255),
    "result1" RESULT DEFAULT 'NOT_PLAYED',
    "result2" RESULT DEFAULT 'NOT_PLAYED',
    "result3" RESULT DEFAULT 'NOT_PLAYED',
    "result4" RESULT DEFAULT 'NOT_PLAYED',
    "result5" RESULT DEFAULT 'NOT_PLAYED',
    "result6" RESULT DEFAULT 'NOT_PLAYED'
);

CREATE TABLE "OntarioOpenStanding" (
    section VARCHAR(20) PRIMARY KEY,
    pairings JSONB DEFAULT '[]'
);
