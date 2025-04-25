import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Outlet, useParams } from "react-router-dom"

import CourseReviewModal from "../components/core/ViewCourse/CourseReviewModal"
import VideoDetailsSidebar from "../components/core/ViewCourse/VideoDetailsSidebar"
import { getFullDetailsOfCourse } from "../services/operations/courseDetailsAPI"
import {
  setCompletedLectures,
  setCourseSectionData,
  setEntireCourseData,
  setTotalNoOfLectures,
} from "../slices/viewCourseSlice"
import { GiHamburgerMenu } from "react-icons/gi"

export default function ViewCourse() {
  const { courseId } = useParams()
  const { token } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const [reviewModal, setReviewModal] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    ;(async () => {
      const courseData = await getFullDetailsOfCourse(courseId, token)
      dispatch(setCourseSectionData(courseData.courseDetails.courseContent))
      dispatch(setEntireCourseData(courseData.courseDetails))
      dispatch(setCompletedLectures(courseData.completedVideos))

      let lectures = 0
      courseData?.courseDetails?.courseContent?.forEach((sec) => {
        lectures += sec.subSection.length
      })
      dispatch(setTotalNoOfLectures(lectures))
    })()
  }, [])

  return (
    <>
      {/* Mobile Top Navbar */}
      <div className="sm:hidden flex items-center justify-between px-4 py-2 bg-richblack-800 text-white">
        <button onClick={() => setSidebarOpen(true)}>
          <GiHamburgerMenu size={24} />
        </button>
        <span className="text-lg font-semibold">Course Viewer</span>
      </div>

      {/* Sidebar Overlay on Mobile */}
      {sidebarOpen && (
        <div className="sm:hidden fixed inset-0 z-50 bg-black bg-opacity-50" onClick={() => setSidebarOpen(false)}></div>
      )}

      {/* Page Layout */}
      <div className="flex flex-row min-h-[calc(100vh-3.5rem)] relative">

        {/* Sidebar: Always visible on desktop, slide-in on mobile */}
        <div
          className={`z-50 sm:relative absolute top-0 left-0 h-full w-[320px] max-w-[350px] bg-richblack-800 transition-transform duration-300 transform ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } sm:translate-x-0 sm:z-0`}
        >
          <VideoDetailsSidebar
            setReviewModal={setReviewModal}
            setSidebarOpen={setSidebarOpen}
          />
        </div>

        {/* Main Video Content */}
        <div className="flex-1 overflow-y-auto bg-richblack-900">
          <div className="mx-6 my-2">
            <Outlet />
          </div>
        </div>
      </div>

      {reviewModal && <CourseReviewModal setReviewModal={setReviewModal} />}
    </>
  )
}
