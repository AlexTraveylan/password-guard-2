"use client"
import { useState } from "react"
import { Undo2 } from "../../node_modules/lucide-react"
import { Button } from "./ui/Button"

export function Description() {
  const [isDescrHidden, setIsDescrHidden] = useState(true)

  function toggleDescr() {
    setIsDescrHidden(!isDescrHidden)
  }

  const description_1: string =
    "Password-guard est une application coffre fort pour créer, et stocker vos mots de passe et y avoir acces partout de maniere sécurisée."
  const description_2: string =
    "Inutile de créer un compte, connectez-vous avec votre compte google, seulement les informations indispensables sont utilisées par l&aposapplication : votre email, et votre nom. Aucune donnée est stockée. Cela vous permet d&aposacceder à vos mots de passe de votre ordinateur, de votre téléphone ou de votre tablette."
  const description_3: string =
    "Avec Password-guard, vous pouvez generer aléatoirement des mots de passe pour en avoir un différent sur chaque site ou application."
  const description_4: string =
    "De votre côté, vous aurez besoin de retenir seulement un seul mot de passe. Stocké de la maniere la plus sécurisé qui existe, choississez le suffisamment compliqué pour qu&aposil ne puisse pas être trouvé. Sinon tout vos autres mots de passe seront accessibles."
  const description_5: string =
    "Votre mot de passe maitre est crypté par un algorithme de hashage, les autres sont cryptés et encrypté par une librairie de crypto."
  const descriptions: string[] = [description_1, description_2, description_3, description_4, description_5]
  return (
    <div>
      {isDescrHidden ? (
        <Button onClick={() => toggleDescr()}>Voir description</Button>
      ) : (
        <div className="flex flex-col gap-3">
          <Button onClick={() => toggleDescr()}>
            <Undo2 />
          </Button>
          <ul>
            {descriptions.map((desc) => (
              <li className="my-2" key={desc}>
                {desc}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
