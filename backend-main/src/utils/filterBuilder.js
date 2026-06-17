export const filterRoomsByLocation = (rooms, location) => {
  if (!location) return rooms;
  const loc = location.toLowerCase();
  return rooms.filter(room => {
    const hotel = room.hotelId;
    return (
      hotel.location.country.toLowerCase().includes(loc) ||
      hotel.location.province.toLowerCase().includes(loc) ||
      hotel.location.city.toLowerCase().includes(loc)
    );
  });
};

export const groupRoomsByHotel = (rooms) => {
  const grouped = {};
  for (const room of rooms) {
    const hotelId = room.hotelId._id.toString();
    if (!grouped[hotelId]) grouped[hotelId] = [];
    grouped[hotelId].push(room);
  }
  return grouped;
};

export const filterHotelsByCapacity = (groupedRooms, persons) => {
  const result = [];
  for (const hotelId in groupedRooms) {
    const roomList = groupedRooms[hotelId];

    const totalCapacity = roomList.reduce((sum, r) => sum + (r.capacity * r.available), 0);

    if (totalCapacity >= persons) {
      const hotel = roomList[0].hotelId; 
      result.push({
        hotelId,
        hotelName: hotel.name,
        hotelLocation: hotel.location,
        totalCapacity,
        images: hotel.images || [],
        starRating: hotel.starRating || 0,
        rooms: roomList.map(r => ({
          roomId: r._id,
          type: r.type,
          capacity: r.capacity,
          price: r.price,
          description: r.description,
          features: r.features,
          available: r.available,
          quantity: r.quantity,
        })),
      });
    }
  }
  return result;
};
