import{ useMutation, useQuery } from "@vigilio/preact-fetching"
import {useForm} from "react-hook-form"

import './app.css'

type Post = {
  id: string;
  title: string;
  content: string;
}

type AddPost = Omit<Post, "id">

export function App() {
  const form = useForm<AddPost>();

  // const { data } = useQuery("/pokemon", async (url) => {
  //   const res = await fetch(`https://pokeapi.co/api/v2${url}`);
  //   return res.json()
  // })

    const { data: posts, refetch } = useQuery<Post[], {message: string}>("/posts", async (url) => {
      const res = await fetch(`http://localhost:4000${url}`);
      return res.json();
    });

  const { mutate } = useMutation<Post, AddPost, { message: string }>(
    "/posts",
    async (url, body) => {
      const res = await fetch(`http://localhost:4000${url}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      return res.json();
    }
  );

  const { mutate: deletePostMutation } = useMutation<
    unknown,
    Post,
    { message: string }
  >(
    "/posts",
    async (url, body) => {
      const res = await fetch(`http://localhost:4000${url}/${body.id}`, {
        method: "DELETE",
      });

      return res.json();
    }
  );

  const onSubmit = (data: AddPost) => {
    mutate(data)
    refetch()
  };

  return (
    <>

      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className={"flex bg-red-500 flex-col"}>
          <input
            type="text"
            placeholder={"Titulo de la publicación"}
            {...form.register("title", {
              required: { message: "El campo es requierido", value: true },
            })}
          />
          <textarea
            rows={5}
            placeholder={"Contenido de la publicación"}
            {...form.register("content", {
              required: { message: "El campo es requierido", value: true },
            })}
          ></textarea>
          <button type="submit" aria-label="Add post">
            Añadir publicación
          </button>
        </div>
      </form>
      <table>
        <thead>
          <tr>
            <th>Titulo</th>
            <th>Contenido</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {posts?.map((post) => (
            <tr key={post.id}>
              <td>{post.title}</td>
              <td>{post.content}</td>
              <td>
                <button
                  type="button"
                  onClick={() => {
                    deletePostMutation(post);
                    refetch();
                  }}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
