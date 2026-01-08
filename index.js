// require("dotenv").config();

// import express from "express";
// import fs from "fs";
// import path from "path";
// const app = express();
// const PORT = 3000;

// app.use(express.json());

// const TESTS_FILE = path.join("", "tests.json");
// const TEACHERS_FILE = path.join("", "teachers.json");
// const STUDENTS_FILE = path.join("", "students.json");
// const COURSES_FILE = path.join("", "courses.json");

// function loadJson(filePath) {
//   if (!fs.existsSync(filePath)) return [];
//   const data = fs.readFileSync(filePath, "utf-8");
//   try {
//     return JSON.parse(data);
//   } catch (err) {
//     console.error("Error parsing", filePath, err);
//     return [];
//   }
// }

// function saveJson(filePath, data) {
//   fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
// }

// let tests = loadJson(TESTS_FILE);
// let courses = loadJson(COURSES_FILE);
// let students = loadJson(STUDENTS_FILE);
// let teachers = loadJson(TEACHERS_FILE);

// let nextTestId = tests.reduce((max, t) => Math.max(max, t.id), 0) + 1;
// let nextCourseId = courses.reduce((max, g) => Math.max(max, g.id), 0) + 1;
// let nextStudentId = students.reduce((max, x) => Math.max(max, x.id), 0) + 1;
// let nextTeacherId = teachers.reduce((max, y) => Math.max(max, y.id), 0) + 1;


// app.listen(PORT, () => {
//   console.log(`Server listening on http://localhost:${PORT}`);
// });



// //4.1===========================================================================

// app.get("/teachers", (req,res)=> {
//     res.json(teachers);
// })
// app.get("/teachers/:id", (req, res) => {
//   const id = Number(req.params.id);
//   const teacher = teachers.find(t => t.id === id);
//   if (!teacher) {
//     return res.status(404).json({ error: "Teacher not found" });
//   }
//   res.json(teacher);
// });
// app.post("/teachers", (req, res) => {
//   const { firstName, lastName, email, department, room } = req.body;
//   if (!firstName || !lastName || !email || !department || !room) {
//     return res.status(400).json({ error: "Missing required fields" });
//   }
//   const newTeacher = {
//     id: nextTeacherId++,
//     firstName,
//     lastName,
//     email,
//     department,
//     room
//   };
//   teachers.push(newTeacher);
//   saveJson(TEACHERS_FILE, teachers);
//   res.status(201).json(newTeacher);
// });
// app.put("/teachers/:id", (req, res) => {
//   const id = Number(req.params.id);
//   const teacher = teachers.find(t => t.id === id);
//   if (!teacher) {
//     return res.status(404).json({ error: "Teacher not found" });
//   }
//   const { firstName, lastName, email, department, room  } = req.body;
//   if (firstName === undefined || lastName === undefined || email === undefined|| department === undefined || room=== undefined) {
//     return res.status(400).json({ error: "No fields provided to update" });
//   }
//   if (firstName !== undefined) teacher.firstName = firstName;
//   if (lastName !== undefined) teacher.lastName = lastName;
//   if (email !== undefined) teacher.email = email;
//   if (department !== undefined) teacher.department = department;
//   if (room !== undefined) teacher.room = room;
//   saveJson(TEACHERS_FILE, teachers);
//   res.json(teacher);
// });
// app.delete("/teachers/:id", (req, res) => {
//   const id = Number(req.params.id);
//   const teacherIndex = teachers.findIndex(t => t.id === id);

//   if (teacherIndex === -1) {
//     return res.status(404).json({ error: "Teacher not found" });
//   }

//   const hasCourse = courses.some(c => c.teacherId === id);
//   if (hasCourse) {
//     return res.status(400).json({
//       error: "Cannot delete teacher who is still assigned to a course"
//     });
//   }

//   teachers.splice(teacherIndex, 1);
//   saveJson(TEACHERS_FILE, teachers);

//   res.json({ message: "Teacher deleted" });
// });

// //4.2////////////////////////////////////////////////////////////////////////////////////////


// app.get("/courses", (req,res)=> {
//     res.json(courses);
// })
// app.get("/courses/:id", (req, res) => {
//   const id = Number(req.params.id);
//   const course = courses.find(t => t.id === id);
//   if (!course) {
//     return res.status(404).json({ error: "course not found" });
//   }
//   res.json(course);
// });
// app.post("/courses", (req, res) => {
//   const { code, name, teacherId, semester, room, schedule } = req.body;
//   if (!code || !name || teacherId === undefined || !semester || !room) {
//     return res.status(400).json({ error: "Missing required fields" });
//   }
//   const newCourse = {
//     id: nextCourseId++,
//     code,
//     name,
//     teacherId: Number(teacherId),
//     semester,
//     room,
//     schedule: schedule || ""
//   };
//   courses.push(newCourse);
//   saveJson(COURSES_FILE, courses);
//   res.status(201).json(newCourse);
// });
// app.put("/courses/:id", (req, res) => {
//   const id = Number(req.params.id);
//   const course = courses.find(t => t.id === id);
//   if (!course) {
//     return res.status(404).json({ error: "Course not found" });
//   }
//   if (req.body.teacherId !== undefined) {
//     const teacherExists = teachers.some(t => t.id === Number(req.body.teacherId));
//     if (!teacherExists) {
//       return res.status(400).json({ error: "teacherId does not match a teacher" });
//     }
//     course.teacherId = Number(req.body.teacherId);
//   }

//   if (req.body.code !== undefined) course.code = req.body.code;
//   if (req.body.name !== undefined) course.name = req.body.name;
//   if (req.body.semester !== undefined) course.semester = req.body.semester;
//   if (req.body.room !== undefined) course.room = req.body.room;
//   if (req.body.schedule !== undefined) course.schedule = req.body.schedule;

//   saveJson(COURSES_FILE, courses);
//   res.json(course);
// });
// app.delete("/courses/:id", (req, res) => {
//   const id = Number(req.params.id);
//   const courseIndex = courses.findIndex(t => t.id === id);

//   if (courseIndex === -1) {
//     return res.status(404).json({ error: "course not found" });
//   }

//   const hasTests = tests.some(c => c.courseId === id);
//   if (hasTests) {
//     return res.status(400).json({
//       error: "Cannot delete course that has tests"
//     });
//   }

//   courses.splice(courseIndex, 1);
//   saveJson(COURSES_FILE, courses);

//   res.json({ message: "Course deleted" });
// });



// //4.3//////////////////////////////////////////////

// // GET  – return all students
// app.get("/students", (req, res) => {
//   res.json(students);
// });

// // GET – return a single student by id .
// app.get("/students/:id", (req, res) => {
//   const id = Number(req.params.id);
//   const student = students.find(s => s.id === id);
//   if (!student) {
//     return res.status(404).json({ error: "Student not found" });
//   }
//   res.json(student);
// });

// // POST – create a new student.
// app.post("/students", (req, res) => {
//   const { firstName, lastName, grade, studentNumber, homeroom } = req.body;

//   if (!firstName || !lastName || grade === undefined || !studentNumber) {
//     return res.status(400).json({ error: "Missing required fields" });
//   }

//   const newStudent = {
//     id: nextStudentId++,
//     firstName,
//     lastName,
//     grade: Number(grade),
//     studentNumber,
//     homeroom: homeroom || ""
//   };

//   students.push(newStudent);
//   saveJson(STUDENTS_FILE, students);

//   res.status(201).json(newStudent);
// });

// // PUT  – update an existing student.
// app.put("/students/:id", (req, res) => {
//   const id = Number(req.params.id);
//   const student = students.find(s => s.id === id);

//   if (!student) {
//     return res.status(404).json({ error: "Student not found" });
//   }

//   const allowedFields = ["firstName", "lastName", "grade", "studentNumber", "homeroom"];
//   const hasField = Object.keys(req.body).some(k => allowedFields.includes(k));

//   if (!hasField) {
//     return res.status(400).json({ error: "No valid fields to update" });
//   }

//   if (req.body.firstName !== undefined) student.firstName = req.body.firstName;
//   if (req.body.lastName !== undefined) student.lastName = req.body.lastName;
//   if (req.body.grade !== undefined) student.grade = Number(req.body.grade);
//   if (req.body.studentNumber !== undefined) student.studentNumber = req.body.studentNumber;
//   if (req.body.homeroom !== undefined) student.homeroom = req.body.homeroom;

//   saveJson(STUDENTS_FILE, students);
//   res.json(student);
// });

// // DELETE  – delete a student, .
// app.delete("/students/:id", (req, res) => {
//   const id = Number(req.params.id);
//   const studentIndex = students.findIndex(s => s.id === id);

//   if (studentIndex === -1) {
//     return res.status(404).json({ error: "Student not found" });
//   }

//   const hasTests = tests.some(t => t.studentId === id);
//   if (hasTests) {
//     return res.status(400).json({
//       error: "Cannot delete student that still has tests"
//     });
//   }

//   students.splice(studentIndex, 1);
//   saveJson(STUDENTS_FILE, students);

//   res.json({ message: "Student deleted" });
// });


// //4.4

// // GET return all test records.
// app.get("/tests", (req, res) => {
//   res.json(tests);
// });

// // GET  return a sngle test by id .
// app.get("/tests/:id", (req, res) => {
//   const id = Number(req.params.id);
//   const test = tests.find(t => t.id === id);
//   if (!test) {
//     return res.status(404).json({ error: "Test not found" });
//   }
//   res.json(test);
// });

// // POST – create a new test record.
// app.post("/tests", (req, res) => {
//   const { studentId, courseId, testName, date, mark, outOf, weight } = req.body;

//   if (
//     studentId === undefined ||
//     courseId === undefined ||
//     !testName ||
//     !date ||
//     mark === undefined ||
//     outOf === undefined
//   ) {
//     return res.status(400).json({ error: "Missing required fields" });
//   }

//   const studentExists = students.some(s => s.id === Number(studentId));
//   const courseExists = courses.some(c => c.id === Number(courseId));

//   if (!studentExists || !courseExists) {
//     return res.status(400).json({
//       error: "studentId or courseId does not match a existing record"
//     });
//   }

//   const newTest = {
//     id: nextTestId++,
//     studentId: Number(studentId),
//     courseId: Number(courseId),
//     testName,
//     date,
//     mark: Number(mark),
//     outOf: Number(outOf),
//     weight: weight !== undefined ? Number(weight) : 0
//   };

//   tests.push(newTest);
//   saveJson(TESTS_FILE, tests);

//   res.status(201).json(newTest);
// });

// // PUT – update a test record, validating studentId and courseId if they change.
// app.put("/tests/:id", (req, res) => {
//   const id = Number(req.params.id);
//   const test = tests.find(t => t.id === id);

//   if (!test) {
//     return res.status(404).json({ error: "Test not found" });
//   }

//   const allowedFields = ["studentId", "courseId", "testName", "date", "mark", "outOf", "weight"];
//   const hasField = Object.keys(req.body).some(k => allowedFields.includes(k));

//   if (!hasField) {
//     return res.status(400).json({ error: "No valid fields to update" });
//   }

//   if (req.body.studentId !== undefined) {
//     const exists = students.some(s => s.id === Number(req.body.studentId));
//     if (!exists) {
//       return res.status(400).json({ error: "studentId does not match a student" });
//     }
//     test.studentId = Number(req.body.studentId);
//   }

//   if (req.body.courseId !== undefined) {
//     const exists = courses.some(c => c.id === Number(req.body.courseId));
//     if (!exists) {
//       return res.status(400).json({ error: "courseId does not match a course" });
//     }
//     test.courseId = Number(req.body.courseId);
//   }

//   if (req.body.testName !== undefined) test.testName = req.body.testName;
//   if (req.body.date !== undefined) test.date = req.body.date;
//   if (req.body.mark !== undefined) test.mark = Number(req.body.mark);
//   if (req.body.outOf !== undefined) test.outOf = Number(req.body.outOf);
//   if (req.body.weight !== undefined) test.weight = Number(req.body.weight);

//   saveJson(TESTS_FILE, tests);
//   res.json(test);
// });

// // DELETE – delete a test record.
// app.delete("/tests/:id", (req, res) => {
//   const id = Number(req.params.id);
//   const testIndex = tests.findIndex(t => t.id === id);

//   if (testIndex === -1) {
//     return res.status(404).json({ error: "Test not found" });
//   }

//   tests.splice(testIndex, 1);
//   saveJson(TESTS_FILE, tests);

//   res.json({ message: "Test deleted" });
// });


// ///extra
// app.get("/students/:id/tests", (req,res)=> {
//   const studentId = Number(req.params.id);

//   const studentExists = students.some(s => s.id === studentId);
//   if(!studentExists){
//     return res.status(404).json({ error: "Student not found" });
//   }
//   const studentTests = tests.filter(t => t.studentId === studentId);
//   res.json(studentTests);
// });
// ////
// app.get("courses/:id/tests",(req,res)=> {
//   const courseId = Number(req.params.id);

//   const courseExists = courses.some(s => s.id === courseId);
//   if(!courseExists){
//     return res.status(404).json({ error: "Course not found" });
//   }
//   const courseTests = tests.filter(t => t.courseId === courseId);
//   res.json(courseTests);

// })
// //
// app.get("student/:id/average",(req,res)=>{
//   const studentId = Number(req.params.id);
//   const studentExists = students.some(c => c.id === studentId);
//   if(!studentExists){
//     return res.status(404).json({error: "Student not found"});
//   }
//   const studentTests = tests.filter(t => t.studentId === studentId);
//   if(studentTests.length === 0){
//     return res.json({studentId, testcount: 0, average: 0,});
//   }
//   total = 0;
//   studentTests.forEach(t => {total += (t.mark / t.outOf) * 100;});
//   const averagePercent = (total/studentTests.length)*100

//   res.json({
//     studentId, testCount: studentTests.length, averagePercent : averagePercent
//   })
// })
// ///////
// app.get("courses/:id/average", (req,res)=>{
//   const courseId = Number(req.params.id);
//   const courseExists = course.some(s => s.courseId === courseId);
//   if(!courseExists){
//     return res.status(404).json({error: "course not found"})
//   }
//   const courseTests = tests.filter(t => t.courseId === courseId);
//   if(courseTests.length === 0){
//     return res.json({courseId, testcount: 0, average: 0,});
//   }


// })
// index.js (MongoDB version - NO JSON FILES)

import "dotenv/config";
import express from "express";
import mongoose from "mongoose";

const app = express();
app.use(express.json());

// -------------------- DB CONNECT --------------------
async function connectDB() {
  if (!process.env.MONGODB_URI) {
    throw new Error("Missing MONGODB_URI in environment variables (.env or Render)");
  }
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("✅ MongoDB connected");
}

// -------------------- HELPERS --------------------
function requireObjectId(value, res, label = "_id") {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    res.status(400).json({ error: `Invalid ${label}` });
    return null;
  }
  return value;
}

// -------------------- SCHEMAS / MODELS --------------------
// IMPORTANT: 3rd parameter forces collection name to match Atlas collection exactly
const Teacher = mongoose.model(
  "Teacher",
  new mongoose.Schema(
    {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      email: { type: String, required: true },
      department: { type: String, required: true },
      room: { type: String, required: true },
    },
    { versionKey: false }
  ),
  "teachers"
);

const Course = mongoose.model(
  "Course",
  new mongoose.Schema(
    {
      code: { type: String, required: true },
      name: { type: String, required: true },

      // relationship field LEFT AS-IS (you said later)
      teacherId: { type: Number, required: true },

      semester: { type: String, required: true },
      room: { type: String, required: true },
      schedule: { type: String, default: "" },
    },
    { versionKey: false }
  ),
  "courses"
);

const Student = mongoose.model(
  "Student",
  new mongoose.Schema(
    {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      grade: { type: Number, required: true },
      studentNumber: { type: String, required: true },
      homeroom: { type: String, default: "" },
    },
    { versionKey: false }
  ),
  "students"
);

const Test = mongoose.model(
  "Test",
  new mongoose.Schema(
    {
      // relationship fields LEFT AS-IS (you said later)
      studentId: { type: Number, required: true },
      courseId: { type: Number, required: true },

      testName: { type: String, required: true },
      date: { type: String, required: true },
      mark: { type: Number, required: true },
      outOf: { type: Number, required: true },
      weight: { type: Number, default: 0 },
    },
    { versionKey: false }
  ),
  "tests"
);

// -------------------- TEACHERS CRUD --------------------
app.get("/teachers", async (req, res) => {
  res.json(await Teacher.find());
});

app.get("/teachers/:id", async (req, res) => {
  const id = requireObjectId(req.params.id, res, "teacher _id");
  if (!id) return;

  const teacher = await Teacher.findById(id);
  if (!teacher) return res.status(404).json({ error: "Teacher not found" });

  res.json(teacher);
});

app.post("/teachers", async (req, res) => {
  const { firstName, lastName, email, department, room } = req.body;
  if (!firstName || !lastName || !email || !department || !room) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  // NO numeric id anymore
  const created = await Teacher.create({ firstName, lastName, email, department, room });
  res.status(201).json(created);
});

app.put("/teachers/:id", async (req, res) => {
  const id = requireObjectId(req.params.id, res, "teacher _id");
  if (!id) return;

  const allowed = ["firstName", "lastName", "email", "department", "room"];
  const hasAllowed = Object.keys(req.body).some((k) => allowed.includes(k));
  if (!hasAllowed) return res.status(400).json({ error: "No valid fields to update" });

  const updated = await Teacher.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
  if (!updated) return res.status(404).json({ error: "Teacher not found" });

  res.json(updated);
});

app.delete("/teachers/:id", async (req, res) => {
  const id = requireObjectId(req.params.id, res, "teacher _id");
  if (!id) return;

  // Relationship check LEFT AS-IS. (Will likely be wrong until you convert relationships)
  // Keeping it because you had it before.
  const hasCourse = await Course.exists({ teacherId: id });
  if (hasCourse) {
    return res.status(400).json({ error: "Cannot delete teacher who is still assigned to a course" });
  }

  const deleted = await Teacher.findByIdAndDelete(id);
  if (!deleted) return res.status(404).json({ error: "Teacher not found" });

  res.json({ message: "Teacher deleted" });
});

// -------------------- COURSES CRUD --------------------
app.get("/courses", async (req, res) => {
  res.json(await Course.find());
});

app.get("/courses/:id", async (req, res) => {
  const id = requireObjectId(req.params.id, res, "course _id");
  if (!id) return;

  const course = await Course.findById(id);
  if (!course) return res.status(404).json({ error: "Course not found" });

  res.json(course);
});

app.post("/courses", async (req, res) => {
  const { code, name, teacherId, semester, room, schedule } = req.body;
  if (!code || !name || teacherId === undefined || !semester || !room) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  // Relationship validation LEFT AS-IS (still checks old numeric id; likely needs later conversion)
  // const teacherExists = await Teacher.exists({ id: Number(teacherId) });

  const created = await Course.create({
    code,
    name,
    teacherId: Number(teacherId),
    semester,
    room,
    schedule: schedule ?? "",
  });

  res.status(201).json(created);
});

app.put("/courses/:id", async (req, res) => {
  const id = requireObjectId(req.params.id, res, "course _id");
  if (!id) return;

  const allowed = ["code", "name", "teacherId", "semester", "room", "schedule"];
  const hasAllowed = Object.keys(req.body).some((k) => allowed.includes(k));
  if (!hasAllowed) return res.status(400).json({ error: "No valid fields to update" });

  if (req.body.teacherId !== undefined) req.body.teacherId = Number(req.body.teacherId);

  const updated = await Course.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
  if (!updated) return res.status(404).json({ error: "Course not found" });

  res.json(updated);
});

app.delete("/courses/:id", async (req, res) => {
  const id = requireObjectId(req.params.id, res, "course _id");
  if (!id) return;

  // Relationship check LEFT AS-IS (tests still store numeric courseId)
  const hasTests = await Test.exists({ courseId: id });
  if (hasTests) return res.status(400).json({ error: "Cannot delete course that has tests" });

  const deleted = await Course.findByIdAndDelete(id);
  if (!deleted) return res.status(404).json({ error: "Course not found" });

  res.json({ message: "Course deleted" });
});

// -------------------- STUDENTS CRUD --------------------
app.get("/students", async (req, res) => {
  res.json(await Student.find());
});

app.get("/students/:id", async (req, res) => {
  const id = requireObjectId(req.params.id, res, "student _id");
  if (!id) return;

  const student = await Student.findById(id);
  if (!student) return res.status(404).json({ error: "Student not found" });

  res.json(student);
});

app.post("/students", async (req, res) => {
  const { firstName, lastName, grade, studentNumber, homeroom } = req.body;
  if (!firstName || !lastName || grade === undefined || !studentNumber) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const created = await Student.create({
    firstName,
    lastName,
    grade: Number(grade),
    studentNumber,
    homeroom: homeroom ?? "",
  });

  res.status(201).json(created);
});

app.put("/students/:id", async (req, res) => {
  const id = requireObjectId(req.params.id, res, "student _id");
  if (!id) return;

  const allowed = ["firstName", "lastName", "grade", "studentNumber", "homeroom"];
  const hasAllowed = Object.keys(req.body).some((k) => allowed.includes(k));
  if (!hasAllowed) return res.status(400).json({ error: "No valid fields to update" });

  if (req.body.grade !== undefined) req.body.grade = Number(req.body.grade);

  const updated = await Student.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
  if (!updated) return res.status(404).json({ error: "Student not found" });

  res.json(updated);
});

app.delete("/students/:id", async (req, res) => {
  const id = requireObjectId(req.params.id, res, "student _id");
  if (!id) return;

  // Relationship check LEFT AS-IS
  const hasTests = await Test.exists({ studentId: id });
  if (hasTests) return res.status(400).json({ error: "Cannot delete student that still has tests" });

  const deleted = await Student.findByIdAndDelete(id);
  if (!deleted) return res.status(404).json({ error: "Student not found" });

  res.json({ message: "Student deleted" });
});

// -------------------- TESTS CRUD --------------------
app.get("/tests", async (req, res) => {
  res.json(await Test.find());
});

app.get("/tests/:id", async (req, res) => {
  const id = requireObjectId(req.params.id, res, "test _id");
  if (!id) return;

  const test = await Test.findById(id);
  if (!test) return res.status(404).json({ error: "Test not found" });

  res.json(test);
});

app.post("/tests", async (req, res) => {
  const { studentId, courseId, testName, date, mark, outOf, weight } = req.body;

  if (
    studentId === undefined ||
    courseId === undefined ||
    !testName ||
    !date ||
    mark === undefined ||
    outOf === undefined
  ) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const created = await Test.create({
    studentId: Number(studentId),
    courseId: Number(courseId),
    testName,
    date,
    mark: Number(mark),
    outOf: Number(outOf),
    weight: weight !== undefined ? Number(weight) : 0,
  });

  res.status(201).json(created);
});

app.put("/tests/:id", async (req, res) => {
  const id = requireObjectId(req.params.id, res, "test _id");
  if (!id) return;

  const allowed = ["studentId", "courseId", "testName", "date", "mark", "outOf", "weight"];
  const hasAllowed = Object.keys(req.body).some((k) => allowed.includes(k));
  if (!hasAllowed) return res.status(400).json({ error: "No valid fields to update" });

  if (req.body.studentId !== undefined) req.body.studentId = Number(req.body.studentId);
  if (req.body.courseId !== undefined) req.body.courseId = Number(req.body.courseId);
  if (req.body.mark !== undefined) req.body.mark = Number(req.body.mark);
  if (req.body.outOf !== undefined) req.body.outOf = Number(req.body.outOf);
  if (req.body.weight !== undefined) req.body.weight = Number(req.body.weight);

  const updated = await Test.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
  if (!updated) return res.status(404).json({ error: "Test not found" });

  res.json(updated);
});

app.delete("/tests/:id", async (req, res) => {
  const id = requireObjectId(req.params.id, res, "test _id");
  if (!id) return;

  const deleted = await Test.findByIdAndDelete(id);
  if (!deleted) return res.status(404).json({ error: "Test not found" });

  res.json({ message: "Test deleted" });
});

// -------------------- EXTRA QUERY ROUTES (by Mongo _id for the URL) --------------------

// All tests for a student (student URL param is student _id)
app.get("/students/:id/tests", async (req, res) => {
  const studentMongoId = requireObjectId(req.params.id, res, "student _id");
  if (!studentMongoId) return;

  // NOTE: This will only work correctly AFTER you convert Test.studentId to store student _id.
  const studentExists = await Student.exists({ _id: studentMongoId });
  if (!studentExists) return res.status(404).json({ error: "Student not found" });

  const studentTests = await Test.find({ studentId: studentMongoId });
  res.json(studentTests);
});

// All tests for a course (course URL param is course _id)
app.get("/courses/:id/tests", async (req, res) => {
  const courseMongoId = requireObjectId(req.params.id, res, "course _id");
  if (!courseMongoId) return;

  // NOTE: This will only work correctly AFTER you convert Test.courseId to store course _id.
  const courseExists = await Course.exists({ _id: courseMongoId });
  if (!courseExists) return res.status(404).json({ error: "Course not found" });

  const courseTests = await Test.find({ courseId: courseMongoId });
  res.json(courseTests);
});

// Average for a student
app.get("/students/:id/average", async (req, res) => {
  const studentMongoId = requireObjectId(req.params.id, res, "student _id");
  if (!studentMongoId) return;

  const studentExists = await Student.exists({ _id: studentMongoId });
  if (!studentExists) return res.status(404).json({ error: "Student not found" });

  const studentTests = await Test.find({ studentId: studentMongoId });

  if (studentTests.length === 0) {
    return res.json({ studentId: studentMongoId, testCount: 0, averagePercent: 0 });
  }

  let sum = 0;
  for (const t of studentTests) {
    const percent = t.outOf === 0 ? 0 : (t.mark / t.outOf) * 100;
    sum += percent;
  }
  const averagePercent = sum / studentTests.length;

  res.json({ studentId: studentMongoId, testCount: studentTests.length, averagePercent });
});

// Average for a course
app.get("/courses/:id/average", async (req, res) => {
  const courseMongoId = requireObjectId(req.params.id, res, "course _id");
  if (!courseMongoId) return;

  const courseExists = await Course.exists({ _id: courseMongoId });
  if (!courseExists) return res.status(404).json({ error: "Course not found" });

  const courseTests = await Test.find({ courseId: courseMongoId });

  if (courseTests.length === 0) {
    return res.json({ courseId: courseMongoId, testCount: 0, averagePercent: 0 });
  }

  let sum = 0;
  for (const t of courseTests) {
    const percent = t.outOf === 0 ? 0 : (t.mark / t.outOf) * 100;
    sum += percent;
  }
  const averagePercent = sum / courseTests.length;

  res.json({ courseId: courseMongoId, testCount: courseTests.length, averagePercent });
});

// -------------------- START --------------------
const PORT = process.env.PORT || 3000;

connectDB()
  .then(() => {
    app.listen(PORT, () => console.log(`✅ Server listening on http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error("❌ Failed to start server:", err.message);
    process.exit(1);
  });
