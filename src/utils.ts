import React from "react";

export type ReactChildren =
  | React.ReactChild
  | React.ReactChildren
  | React.ReactChild[]
  | React.ReactChildren[]
  | JSX.Element
  | JSX.Element[];

export const WeekNames = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
export const WeekNamesFull = [
  "Понедельник",
  "Вторник",
  "Среда",
  "Четверг",
  "Пятница",
  "Суббота",
  "Воскресенье",
];

export class EventEmitter<T> {
  callbacks: ((val: T) => void)[] = [];

  on(cb: (val: T) => void) {
    this.callbacks.push(cb);
  }

  off(cb: (val: T) => void) {
    this.callbacks = this.callbacks.filter((callback) => callback !== cb);
  }

  emit(data: T) {
    this.callbacks.forEach((cb) => cb(data));
  }
}

export const Times = Array.from({ length: 24 }).map((_, i) => {
  const prefix = i < 10 ? "0" : "";
  return prefix + i + ":00";
});
