import { useState } from "react";
import { Clock, MapPin } from "lucide-react";

const Button = ({ onClick, children }) => (
  <button
    onClick={onClick}
    className="px-4 py-2 bg-acses-green-600 text-white rounded-md hover:bg-acses-green-700 transition"
  >
    {children}
  </button>
);

const Card = ({ children, onClick }) => (
  <div
    className="w-full max-w-md p-4 border rounded-lg shadow-md cursor-pointer hover:bg-gray-100 transition"
    onClick={onClick}
  >
    {children}
  </div>
);

const CardHeader = ({ children }) => <div className="mb-2">{children}</div>;

const CardTitle = ({ children }) => (
  <h2 className="text-xl font-semibold">{children}</h2>
);

const Dialog = ({ open, onOpenChange, children }) => (
  open && (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full mx-3">
        {children}
        <div className="mt-4 text-right">
          <Button onClick={() => onOpenChange(false)}>Close</Button>
        </div>
      </div>
    </div>
  )
);

const DialogContent = ({ children }) => <div>{children}</div>;

const DialogHeader = ({ children }) => <div className="mb-4">{children}</div>;

const DialogTitle = ({ children }) => (
  <h3 className="text-2xl font-bold">{children}</h3>
);

const EventCard = ({ eventDetails, onClose }) => {
  const [isModalOpen, setIsModalOpen] = useState(true);

  const handleClose = () => {
    setIsModalOpen(false);
    onClose(); // Call the onClose function passed from the parent component
  };

  return (
    <>
      <Dialog open={isModalOpen} onOpenChange={handleClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{eventDetails.title}</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-gray-600">
                <Clock className="h-5 w-5" /> Time:
                <span>{eventDetails.time}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="h-5 w-5" /> Venue:
                <span>{eventDetails.location}</span>
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">About this event</h3>
              <p className="text-gray-600 leading-relaxed">{eventDetails.description}</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EventCard;