
import React from 'react';

const Detail = ({ note, setNote }) => {
  return (
    <div className="mb-6">
      <label className="block text-lg font-medium mb-2 text-center">
        Today's Notes
      </label>
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Write about your day..."
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        rows={4}
      />
    </div>
  );
};

export default Detail;

// import React from 'react';

// const Detail = ({ note, setNote }) => {
//   return (
//     <div className="mt-4">
//       <textarea
//         value={note}
//         onChange={(e) => setNote(e.target.value)}
//         className="w-full p-3 border rounded-lg"
//         placeholder="How are you feeling today?"
//         rows="4"
//       />
//     </div>
//   );
// };

// export default Detail;