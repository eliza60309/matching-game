import React, { useEffect, useState } from "react";
import { getImg } from "../utils/img";
import styles from "./button.module.css";

export class Card {
  constructor(args, destroy) {
    this.args = new Object(args);
    this.Links = [];
    this.Locks = [];
    this.clickable = true;
    this.destroy = destroy;

    this.onClick = () => {
      if(this.clickable) {
        this.onDestroy();
        this.destroy(this);
        //console.log(this.args.id + " is destroyed");
      }
      else {
        console.log("Booy");
      }
    }

    this.onDestroy = () => {
      this.Links.map((card) => card.notifyDestroy(this));
      this.Links = [];
    };
  
    this.notifyDestroy = (destroyedCard) => {
      this.Locks = this.Locks.filter((card) => card.args.id !== destroyedCard.args.id );
      if(this.Locks.length === 0) {
        this.clickable = true;
      }
      else {
        this.clickable = false;
      }
      //console.log(`${this.args.id} has ${this.Locks.length} locks`);

    };
  
    this.notifyLinkCreate = (card) => {
      this.Links.push(card);
      //console.log(`Link Created from ${this.args.id} to ${card.args.id}`);
      //console.log(`${this.args.id} has ${this.Links.length} links`);
    };
  
    this.notifyLockCreate = (card) => {
      this.Locks.push(card);
      this.clickable = false;
      //console.log(`Lock Created from ${card.args.id} to ${this.args.id}`);
      //console.log(`${this.args.id} has ${this.Locks.length} locks`);
    };
  }

  
};

export const ButtonElement = (props) => {
  const { args, enabled } = props;

  return (
    <div
      className={styles.button}
      style={{
        borderWidth: 1,
        borderRadius: 5,
        borderStyle: "solid",
        borderColor: "darkgrey",
        transition: "background-color 0.5s",
        backgroundColor: enabled? "lightblue": "grey",
        display: "flex",
        position: "absolute",
        alignItems: "center",
        justifyContent: "center",

        width: args.X.end - args.X.start - 2,
        height: args.Y.end - args.Y.start - 2,
        top: args.Y.start,
        left: args.X.start,
        zIndex: args.Z,

        fontSize: 30
      }}  
      onClick={props.onClick}
      label={args.label}
    > 
      {/*props.text*/}
      <img 
        src={getImg(args.label)}
        style={{
          width: (args.X.end - args.X.start - 2) * 0.6,
          height: (args.Y.end - args.Y.start - 2) * 0.6,
        }}
      />
      <div
        style={{
          transition: "opacity 0.5s",
          opacity: enabled? "0%": "60%",
          borderRadius: 5,
          position: "absolute",
          width: "100%",
          height: "100%",
          backgroundColor: "grey",
        }}
      >
      </div>
    </div>
  );
}