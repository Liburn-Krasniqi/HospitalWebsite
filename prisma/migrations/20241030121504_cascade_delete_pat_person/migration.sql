-- CreateTable
CREATE TABLE `admission` (
    `AdmissionID` INTEGER NOT NULL,
    `PatientID` INTEGER NULL,
    `RoomID` INTEGER NULL,
    `AdmissionDate` DATE NULL,
    `ReleaseDate` DATE NULL,

    INDEX `PatientID`(`PatientID`),
    INDEX `RoomID`(`RoomID`),
    PRIMARY KEY (`AdmissionID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `admission_room` (
    `RoomID` INTEGER NOT NULL,
    `Nr_of_Beds` INTEGER NULL,

    PRIMARY KEY (`RoomID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `appointmentbooking` (
    `DoctorID` INTEGER NOT NULL,
    `PatientID` INTEGER NOT NULL,
    `StartTime` DATETIME(0) NOT NULL,
    `EndTime` DATETIME(0) NULL,

    INDEX `PatientID`(`PatientID`),
    PRIMARY KEY (`DoctorID`, `PatientID`, `StartTime`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `bill` (
    `ReportID` INTEGER NOT NULL,
    `ServiceID` INTEGER NOT NULL,
    `PatientID` INTEGER NULL,

    INDEX `PatientID`(`PatientID`),
    INDEX `ServiceID`(`ServiceID`),
    PRIMARY KEY (`ReportID`, `ServiceID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `dean` (
    `UserID` INTEGER NOT NULL,

    PRIMARY KEY (`UserID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `department` (
    `DepartmentID` INTEGER NOT NULL AUTO_INCREMENT,
    `DeptName` VARCHAR(100) NULL,
    `TheOverlooker` INTEGER NULL,

    INDEX `TheOverlooker`(`TheOverlooker`),
    PRIMARY KEY (`DepartmentID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `doctor` (
    `UserID` INTEGER NOT NULL,
    `Qualification` VARCHAR(255) NOT NULL,
    `Departamenti` VARCHAR(55) NOT NULL,
    `ManagerID` INTEGER NULL,

    INDEX `ManagerID`(`ManagerID`),
    PRIMARY KEY (`UserID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `medication` (
    `MedicationID` INTEGER NOT NULL AUTO_INCREMENT,
    `MedicationName` VARCHAR(100) NULL,
    `Category` VARCHAR(100) NULL,

    PRIMARY KEY (`MedicationID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `nurse` (
    `UserID` INTEGER NOT NULL,
    `Category` VARCHAR(55) NOT NULL,
    `Admission_Room` INTEGER NULL,

    INDEX `Admission_Room`(`Admission_Room`),
    PRIMARY KEY (`UserID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `operating_room` (
    `RoomID` INTEGER NOT NULL,
    `TheOverlooker` INTEGER NULL,

    INDEX `TheOverlooker`(`TheOverlooker`),
    PRIMARY KEY (`RoomID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `operationbooking` (
    `DoctorID` INTEGER NOT NULL,
    `RoomID` INTEGER NOT NULL,
    `StartTime` DATETIME(0) NOT NULL,
    `EndTime` DATETIME(0) NULL,

    INDEX `RoomID`(`RoomID`),
    PRIMARY KEY (`DoctorID`, `RoomID`, `StartTime`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `patient` (
    `UserID` INTEGER NOT NULL,

    PRIMARY KEY (`UserID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `person` (
    `UserID` INTEGER NOT NULL AUTO_INCREMENT,
    `Firstname` VARCHAR(50) NOT NULL,
    `Surname` VARCHAR(50) NOT NULL,
    `Birthday` DATE NOT NULL,
    `Sex` ENUM('M', 'F') NULL,
    `Phone` VARCHAR(20) NULL,
    `Email` VARCHAR(100) NULL,
    `City` VARCHAR(50) NULL,
    `Street` VARCHAR(100) NULL,
    `AddressNr` INTEGER NULL,
    `Roli` ENUM('user', 'doctor', 'dean', 'nurse') NULL DEFAULT 'user',
    `_Password` CHAR(8) NULL,

    UNIQUE INDEX `Email`(`Email`),
    PRIMARY KEY (`UserID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `report` (
    `ReportID` INTEGER NOT NULL AUTO_INCREMENT,
    `ReportDate` DATE NOT NULL,
    `DoctorID` INTEGER NULL,
    `PatientID` INTEGER NULL,
    `Diagnosis` VARCHAR(255) NULL,

    INDEX `DoctorID`(`DoctorID`),
    INDEX `PatientID`(`PatientID`),
    PRIMARY KEY (`ReportID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `room` (
    `RoomID` INTEGER NOT NULL AUTO_INCREMENT,
    `DeptId` INTEGER NULL,

    INDEX `DeptId`(`DeptId`),
    PRIMARY KEY (`RoomID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `service` (
    `ServiceID` INTEGER NOT NULL AUTO_INCREMENT,
    `ServiceName` VARCHAR(100) NULL,
    `Price` DECIMAL(10, 2) NULL,

    PRIMARY KEY (`ServiceID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sets_medication` (
    `ReportID` INTEGER NOT NULL,
    `MedicationID` INTEGER NOT NULL,

    INDEX `MedicationID`(`MedicationID`),
    PRIMARY KEY (`ReportID`, `MedicationID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `staff` (
    `UserID` INTEGER NOT NULL,
    `Salary` INTEGER NULL,
    `StartShift` TIME(0) NULL,
    `EndShift` TIME(0) NULL,
    `AvailableDays` VARCHAR(191) NULL,

    PRIMARY KEY (`UserID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `admission` ADD CONSTRAINT `admission_ibfk_1` FOREIGN KEY (`PatientID`) REFERENCES `patient`(`UserID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `admission` ADD CONSTRAINT `admission_ibfk_2` FOREIGN KEY (`RoomID`) REFERENCES `admission_room`(`RoomID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `admission_room` ADD CONSTRAINT `admission_room_ibfk_1` FOREIGN KEY (`RoomID`) REFERENCES `room`(`RoomID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `appointmentbooking` ADD CONSTRAINT `appointmentbooking_ibfk_1` FOREIGN KEY (`DoctorID`) REFERENCES `doctor`(`UserID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `appointmentbooking` ADD CONSTRAINT `appointmentbooking_ibfk_2` FOREIGN KEY (`PatientID`) REFERENCES `patient`(`UserID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `bill` ADD CONSTRAINT `bill_ibfk_1` FOREIGN KEY (`ReportID`) REFERENCES `report`(`ReportID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `bill` ADD CONSTRAINT `bill_ibfk_2` FOREIGN KEY (`ServiceID`) REFERENCES `service`(`ServiceID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `bill` ADD CONSTRAINT `bill_ibfk_3` FOREIGN KEY (`PatientID`) REFERENCES `patient`(`UserID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `dean` ADD CONSTRAINT `dean_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `staff`(`UserID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `department` ADD CONSTRAINT `department_ibfk_1` FOREIGN KEY (`TheOverlooker`) REFERENCES `doctor`(`UserID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `doctor` ADD CONSTRAINT `doctor_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `staff`(`UserID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `doctor` ADD CONSTRAINT `doctor_ibfk_2` FOREIGN KEY (`ManagerID`) REFERENCES `doctor`(`UserID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `nurse` ADD CONSTRAINT `nurse_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `staff`(`UserID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `nurse` ADD CONSTRAINT `nurse_ibfk_2` FOREIGN KEY (`Admission_Room`) REFERENCES `admission_room`(`RoomID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `operating_room` ADD CONSTRAINT `operating_room_ibfk_1` FOREIGN KEY (`TheOverlooker`) REFERENCES `doctor`(`UserID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `operating_room` ADD CONSTRAINT `operating_room_ibfk_2` FOREIGN KEY (`RoomID`) REFERENCES `room`(`RoomID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `operationbooking` ADD CONSTRAINT `operationbooking_ibfk_1` FOREIGN KEY (`DoctorID`) REFERENCES `doctor`(`UserID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `operationbooking` ADD CONSTRAINT `operationbooking_ibfk_2` FOREIGN KEY (`RoomID`) REFERENCES `operating_room`(`RoomID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `patient` ADD CONSTRAINT `patient_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `person`(`UserID`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `report` ADD CONSTRAINT `report_ibfk_1` FOREIGN KEY (`DoctorID`) REFERENCES `doctor`(`UserID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `report` ADD CONSTRAINT `report_ibfk_2` FOREIGN KEY (`PatientID`) REFERENCES `patient`(`UserID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `room` ADD CONSTRAINT `room_ibfk_1` FOREIGN KEY (`DeptId`) REFERENCES `department`(`DepartmentID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `sets_medication` ADD CONSTRAINT `sets_medication_ibfk_1` FOREIGN KEY (`ReportID`) REFERENCES `report`(`ReportID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `sets_medication` ADD CONSTRAINT `sets_medication_ibfk_2` FOREIGN KEY (`MedicationID`) REFERENCES `medication`(`MedicationID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `staff` ADD CONSTRAINT `staff_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `person`(`UserID`) ON DELETE NO ACTION ON UPDATE NO ACTION;
