export default function MediaEntryCard({ mediaItem }) {

    // title, category, imageUrl, rating
    const ratingStars = Array.from(5).map((_, index) => {
        const isFilled = index < mediaItem.rating;
        return (
            <span key={index} className={`star ${isFilled ? 'filled' : ''}`}>
                {isFilled ? '★' : '☆'}
            </span>
        )
    })
    

    return (
        <div className="media-entry-card">
            <img src={mediaItem.imageUrl} alt={mediaItem.title} />
            <h2>{mediaItem.title}</h2>
            
            
            <p>Uploaded on: {new Date(mediaItem.createdAt).toLocaleDateString()}</p>
        </div>
    );
}