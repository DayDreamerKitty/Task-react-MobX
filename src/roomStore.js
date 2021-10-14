import { observable, action, makeObservable } from "mobx";
import axios from "axios";

class Store {
  Srooms = [];

  constructor() {
    makeObservable(this, {
      Srooms: observable,
      fetchRooms: action,
      createRoom: action,
      deleteRoom: action,
      updateRoom: action,
      createMsg: action,
    });
  }
  fetchRooms = async () => {
    try {
      const response = await axios.get(
        "https://coded-task-axios-be.herokuapp.com/rooms"
      );
      this.Srooms = response.data;
    } catch (error) {
      console.log(error);
    }
  };
  createRoom = async (newRoom) => {
    try {
      const response = await axios.post(
        "https://coded-task-axios-be.herokuapp.com/rooms",
        newRoom
      );
      this.Srooms.push(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  deleteRoom = async (id) => {
    try {
      const response = await axios.delete(
        `https://coded-task-axios-be.herokuapp.com/rooms/${id}`
      );
      this.Srooms = this.Srooms.filter((room) => room.id !== id);
    } catch (error) {
      console.log(error);
    }
  };

  updateRoom = async (updatedRoom) => {
    try {
      const response = await axios.put(
        `https://coded-task-axios-be.herokuapp.com/rooms/${updatedRoom.id}`,
        updatedRoom
      );
      this.Srooms = this.Srooms.map((room) =>
        room.id === updatedRoom.id ? response.data : room
      );
    } catch (error) {
      console.log(error);
    }
  };

  createMsg = async (roomId, msg) => {
    try {
      const response = await axios.post(
        `https://coded-task-axios-be.herokuapp.com/rooms/msg/${roomId}`,
        msg
      );
      this.Srooms = this.Srooms.map((room) =>
        room.id === roomId
          ? { ...room, messages: [...room.messages, response.data] }
          : room
      );
    } catch (error) {
      console.log(error);
    }
  };
}

const roomStore = new Store();
roomStore.fetchRooms();
export default roomStore;
