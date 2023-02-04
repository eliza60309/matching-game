import React, { useEffect, useState } from "react";

export class Card {
  constructor(args, destroy) {
    this.args = new Object(args);
    this.Links = [];
    this.Locks = [];
    this.clickable = true;
    this.destroy = destroy;
    this.enabled = () => {
      console.log(this.clickable);
      return this.clickable;

    }
    this.onClick = () => {
      if(this.clickable) {
        this.onDestroy();
        this.destroy(this);
        console.log(this.args.id + " is destroyed");
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
      console.log(`${this.args.id} has ${this.Locks.length} locks`);

    };
  
    this.notifyLinkCreate = (card) => {
      this.Links.push(card);
      console.log(`Link Created from ${this.args.id} to ${card.args.id}`);
      console.log(`${this.args.id} has ${this.Links.length} links`);
    };
  
    this.notifyLockCreate = (card) => {
      this.Locks.push(card);
      this.clickable = false;
      console.log(`Lock Created from ${card.args.id} to ${this.args.id}`);
      console.log(`${this.args.id} has ${this.Locks.length} locks`);
    };

    this.button = (<ButtonElement
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
    />);
  }

  
};

export const ButtonElement = (props) => {
  const { XStart, XEnd, YStart, YEnd, Layer } = props;
  // const [ enabled, setEnabled ] = useState();
  // useEffect(() => {
  //   setEnabled(props.card.clickable);
  //   console.log("121");
  // }, [props.card.clickable]);
  return (
    <button
      style={{
        borderWidth: 1,
        // backgroundColor: enabled? "lightblue": "blue",
        backgroundColor: "lightblue",
        borderRadius: 5,
        position: "absolute",

        fontSize: 30,

        width: XEnd - XStart,
        height: YEnd - YStart,
        top: YStart,
        left: XStart,
        zIndex: Layer
      }}  
      onClick={props.onClick}
    > 
    {props.text}
    </button>
  );
}