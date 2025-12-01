import { Star, ThumbsUp, MessageSquare, MoreHorizontal } from "lucide-react";

const reviews = [
  {
    id: 1,
    customer: "Sarah Johnson",
    rating: 5,
    date: "2 days ago",
    comment:
      "Excellent service! The team was very professional and the results exceeded my expectations. Highly recommended.",
    service: "Premium Package",
    avatar: "SJ",
    color: "indigo",
  },
  {
    id: 2,
    customer: "Michael Chen",
    rating: 4,
    date: "1 week ago",
    comment:
      "Great experience overall. The booking process was smooth and the staff was friendly. Just a bit of a wait time.",
    service: "Standard Service",
    avatar: "MC",
    color: "emerald",
  },
  {
    id: 3,
    customer: "Emma Wilson",
    rating: 5,
    date: "2 weeks ago",
    comment: "Absolutely loved it! Will definitely be coming back.",
    service: "Consultation",
    avatar: "EW",
    color: "purple",
  },
  {
    id: 4,
    customer: "James Rodriguez",
    rating: 3,
    date: "3 weeks ago",
    comment: "Service was okay, but I felt it was a bit rushed.",
    service: "Follow-up",
    avatar: "JR",
    color: "orange",
  },
];

export default function BookingReviews() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Reviews & Feedback</h1>
          <p className="text-slate-400">
            See what your customers are saying about you.
          </p>
        </div>
        <div className="flex gap-4">
          <div className="text-center px-4 py-2 bg-slate-900 border border-slate-800 rounded-lg">
            <div className="text-2xl font-bold text-white">4.8</div>
            <div className="text-xs text-slate-400">Average Rating</div>
          </div>
          <div className="text-center px-4 py-2 bg-slate-900 border border-slate-800 rounded-lg">
            <div className="text-2xl font-bold text-white">124</div>
            <div className="text-xs text-slate-400">Total Reviews</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-slate-700 transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                <div
                  className={`w-12 h-12 rounded-full bg-${review.color}-500/10 flex items-center justify-center text-${review.color}-400 font-bold text-lg`}
                >
                  {review.avatar}
                </div>
                <div>
                  <h3 className="font-bold text-white">{review.customer}</h3>
                  <p className="text-sm text-slate-400">
                    {review.service} • {review.date}
                  </p>
                </div>
              </div>
              <button className="text-slate-500 hover:text-white transition-colors">
                <MoreHorizontal size={20} />
              </button>
            </div>

            <div className="flex items-center gap-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className={
                    i < review.rating
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-slate-700"
                  }
                />
              ))}
            </div>

            <p className="text-slate-300 leading-relaxed mb-4">
              "{review.comment}"
            </p>

            <div className="flex items-center gap-4 pt-4 border-t border-slate-800">
              <button className="flex items-center gap-2 text-sm text-slate-400 hover:text-indigo-400 transition-colors">
                <ThumbsUp size={16} />
                Helpful
              </button>
              <button className="flex items-center gap-2 text-sm text-slate-400 hover:text-indigo-400 transition-colors">
                <MessageSquare size={16} />
                Reply
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
