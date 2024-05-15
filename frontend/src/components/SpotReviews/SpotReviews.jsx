import * as reviewActions from "../../store/reviews";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import DeleteReviewModal from "../DeleteReviewModal";
import styles from "./SpotReviews.module.css";

export default function SpotReviews() {
    const { spotId } = useParams();
    const mySpotId = Number(spotId);
    const spotReviews = useSelector((state) => state.reviews);
    const currentUser = useSelector((state) => state.session.user);
    const dispatch = useDispatch();

    const spotReviewsArray = spotReviews ? Object.values(spotReviews) : [];
    // console.log("spotReviewsArray in SpotReviews", spotReviewsArray);


    // console.log("spotReviews", spotReviews);
    useEffect(() => {
        dispatch(reviewActions.getReviewsThunk(mySpotId)); // num or string?
    }, [dispatch, mySpotId]);

    // if (!Array.isArray(reviews) || reviews.length === 0) { //review now an object!!!
    //     return <div>Reviews not found</div>;
    // }
    // if (!reviews) {
    //     return <div>Reviews not found</div>;
    // }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { month: "long", year: "numeric" };
        return date.toLocaleDateString("en-US", options);
    };


    return (
        <div>
            {spotReviewsArray.map((review) => (
                <div className={styles.review} key={review.id}>
                    <div className={styles.reviewInfo}>
                        <div className={styles.reviewFirstName}>
                            {review.User?.firstName}
                        </div>
                        <div className={styles.reviewDate}>
                            {formatDate(review.createdAt)}
                        </div>
                        <div className={styles.reviewDescription}>
                            {review.review}
                        </div>
                    </div>
                    {currentUser?.id === review.userId && (
                        // <button
                        //     className={styles.deleteButton}
                        //     onClick={() => handleDeleteReview(review.id)}
                        // >
                        //     <FaTrash />
                        // </button>
                        <OpenModalButton
                            buttonText={"Delete"}
                            modalComponent={
                                <DeleteReviewModal
                                    reviewId={review.id}
                                    spotId={spotId}
                                />
                            }
                        />
                    )}
                </div>
            ))}
        </div>
    );
}
