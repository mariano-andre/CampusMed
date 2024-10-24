CREATE TABLE alunos (
    idAluno INT PRIMARY KEY AUTO_INCREMENT,
    matricula VARCHAR(20) NOT NULL UNIQUE,
    nomeCompleto VARCHAR(100) NOT NULL
);

CREATE TABLE prontuarios (
    idProntuario INT PRIMARY KEY AUTO_INCREMENT,
    idAluno INT NOT NULL,
    dataConsulta DATE NOT NULL,
    inicioAtendimento TIME NOT NULL,
    fimAtendimento TIME NOT NULL,
    hda TEXT,
    tratamento TEXT,
    FOREIGN KEY (idAluno) REFERENCES alunos(idAluno)
);
