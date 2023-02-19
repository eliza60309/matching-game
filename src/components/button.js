import React, { useEffect, useState } from "react";
import { getImg } from "../utils/img";

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

    /*this.button = (<ButtonElement
      XStart={this.args.X.start}
      XEnd={this.args.X.end}
      YStart={this.args.Y.start}
      YEnd={this.args.Y.end}
      Layer={this.args.Z}
      text={this.args.Z}
      onClick={this.onClick}
      key={this.args.id}
      enabled={this.enabled}
      card={this}
      test={this.args.test}
    />);*/
  }

  
};

export const ButtonElement = (props) => {
  const { args, enabled } = props;

  return (
    <button
      style={{
        borderWidth: 1,
        borderRadius: 5,
        transition: "background-color 0.5s",
        backgroundColor: enabled? "lightblue": "grey",
        display: "flex",
        position: "absolute",
        alignItems: "center",
        justifyContent: "center",

        width: args.X.end - args.X.start,
        height: args.Y.end - args.Y.start,
        top: args.Y.start,
        left: args.X.start,
        zIndex: args.Z,

        fontSize: 30
      }}  
      onClick={props.onClick}
      label={props.label}
    > 
      {/*props.text*/}
      <img 
        src={getImg(props.label)}
        style={{
          width: args.X.end - args.X.start - 20,
          height: args.Y.end - args.Y.start - 20,
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
    </button>
  );
}