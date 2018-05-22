package main

import (
  "log"

  firebase "firebase.google.com/go"
  "google.golang.org/api/option"
)

func main(){
  opt := option.WithCredentialsFile("linmirror-bd427-firebase-adminsdk-l6jnh-0e1179b944.json")
  app, err := firebase.NewApp(context.Background(), nil, opt)
  if err != nil {
    return nil, fmt.Errorf("error initializing app: %v", err)
  }

  client, err := app.Firestore(context.Background())
  if err != nil {
    log.Fatalln(err)
  }

  ref := client.NewRef("")


  defer client.Close()
}
