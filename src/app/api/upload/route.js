// import multer from "multer";
// import { NextResponse } from "next/server";

// // Configure multer for storing uploaded images
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "../../../uploads"); // Set the destination folder for uploaded images
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.originalname); // Use the original filename
//   },
// });
// const upload = multer({ storage });

// export const config = {
//   api: {
//     bodyParser: false, // Disable bodyParser as we're using multer
//   },
// };

// export const POST = async (request) => {
//   try {
//     upload.single("image")(request, NextResponse, async (err) => {
//       if (err instanceof multer.MulterError) {
//         console.log(err);
//         //   return res.status(400).json({ error: err.message });
//       } else if (err) {
//         console.log(err);
//       }

//       // File uploaded successfully
//       return new NextResponse("post has been created", { status: 201 });
//     });
//   } catch (error) {
//     return new NextResponse("Database Error", { status: 500 });
//   }
// };

import multer from "multer";
import { NextResponse } from "next/server";

// Configure multer for storing uploaded images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../../../uploads"); // Set the destination folder for uploaded images
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Use the original filename
  },
});
const upload = multer({ storage });

export const config = {
  api: {
    bodyParser: false, // Disable bodyParser as we're using multer
  },
};

export const POST = async (request) => {
  return new Promise((resolve, reject) => {
    // Use multer to handle the image upload
    upload.single("image")(request, null, async (err) => {
      if (err instanceof multer.MulterError) {
        console.log(err);
        reject(new NextResponse("Image upload error", { status: 400 }));
      } else if (err) {
        console.log(err);
        reject(new NextResponse("Server error", { status: 500 }));
      }

      // File uploaded successfully
      resolve(new NextResponse("Post has been created", { status: 201 }));
    });
  });
};
