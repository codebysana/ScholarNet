export interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  avatar?: Avatar;
  allCourses?: {
    _id: string;
  }[];
  [key: string]: unknown;
}

export interface Avatar {
  url: string;
}

export interface CourseLink {
  title: string;
  url: string;
}

export interface CourseContentResponse {
  success: boolean;
  content: CourseContent[];
}

export interface QuestionReply {
  _id: string;
  user: User;
  answer: string;
  createdAt?: string;
}

export interface Question {
  _id: string;
  question: string;
  createdAt: string;
  user: User;
  questionReplies: QuestionReply[];
}

export interface CourseContent {
  _id: string;
  title: string;
  description: string;
  videoUrl: string;
  links: CourseLink[];
  questions: Question[];
  tags?: string;
  videoSection: string;
  videoDuration: number;
}

export interface ReviewReply {
  _id: string;
  comment: string;
  createdAt: string;
  user: User;
}

export interface Review {
  _id: string;
  rating: number;
  comment: string;
  createdAt: string;
  user: User;
  commentReplies: ReviewReply[];
}

export interface Benefit {
  title: string;
}

export interface Prerequisite {
  title: string;
}

export interface Course {
  _id: string;
  name: string;
  description: string;
  tags: string;
  demoUrl: string;
  ratings: number;
  price: number;
  estimatedPrice: number;
  purchased: number;
  benefits: Benefit[];
  prerequisites: Prerequisite[];
  courseData: CourseContent[];
  reviews: Review[];
}

export interface CourseDetailsResponse {
  course: Course;
}

export interface UserCourse {
  _id: string;
}

export interface UserCourseData {
  courses: UserCourse[];
  name?: string;
  email?: string;
  avatar?: { url?: string } | string | null;
  role?: string;
  [key: string]: unknown;
};

export interface CourseDetails {
  _id: string;
  name: string;
  ratings: number;
  purchased: number;
  price: number;
  estimatedPrice: number;
  courseData: unknown[];
  thumbnail: {
    url: string;
  }
  [key: string]: unknown;
};