import api from "./api";

export const jobSeekerService = {
  getMyProfile,
  createProfile,
  updateProfile,
};

/* ===============================
   GET MY JOBSEEKER PROFILE
   GET /jobseekers/me
================================ */
async function getMyProfile() {
  try {
    const response = await api.get("/jobseekers/me");
    return response.data;
  } catch (error: any) {
    throw error?.response?.data || error;
  }
}

interface CreateJobSeekerPayload {
  gender?: string;
  dob?: string;
  status?: string;
  skills?: string[];
  education?: any[];
  workExperience?: any[];
  profilePhoto?: File;
  resume?: File;
}

async function createProfile(payload: CreateJobSeekerPayload) {
  try {
    const formData = new FormData();

    if (payload.gender) formData.append("gender", payload.gender);
    if (payload.dob) formData.append("dob", payload.dob);
    if (payload.status) formData.append("status", payload.status);

    if (payload.skills) {
      formData.append("skills", JSON.stringify(payload.skills));
    }

    if (payload.education) {
      formData.append("education", JSON.stringify(payload.education));
    }

    if (payload.workExperience) {
      formData.append("workExperience", JSON.stringify(payload.workExperience));
    }

    if (payload.profilePhoto) {
      formData.append("profilePhoto", payload.profilePhoto);
    }

    if (payload.resume) {
      formData.append("resume", payload.resume);
    }

    const response = await api.post("/jobseekers", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error: any) {
    throw error?.response?.data || error;
  }
}

interface UpdateJobSeekerPayload extends CreateJobSeekerPayload {}

async function updateProfile(userId: string, payload: UpdateJobSeekerPayload) {
  try {
    const formData = new FormData();

    if (payload.gender) formData.append("gender", payload.gender);
    if (payload.dob) formData.append("dob", payload.dob);
    if (payload.status) formData.append("status", payload.status);

    if (payload.skills) {
      formData.append("skills", JSON.stringify(payload.skills));
    }

    if (payload.education) {
      formData.append("education", JSON.stringify(payload.education));
    }

    if (payload.workExperience) {
      formData.append("workExperience", JSON.stringify(payload.workExperience));
    }

    if (payload.profilePhoto) {
      formData.append("profilePhoto", payload.profilePhoto);
    }

    if (payload.resume) {
      formData.append("resume", payload.resume);
    }

    const response = await api.patch(`/jobseekers/${userId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error: any) {
    throw error?.response?.data || error;
  }
}
