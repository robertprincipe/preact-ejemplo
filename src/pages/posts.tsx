import { useMutation, useQuery } from "@vigilio/preact-fetching";

import { render } from "preact";
import { c, sweetModal } from "@vigilio/sweet";
import PostForm from "../components/post-form";
import { useState } from "preact/hooks";

type Post = {
  id: string;
  title: string;
  content: string;
};

const postFormElement = (refetch: any, post?: Post) => {
  const container = c("div");
  render(<PostForm post={post} refetch={refetch} />, container);
  return container.firstElementChild;
};

function PostsPage() {
  const { data: posts, refetch } = useQuery<Post[], { message: string }>(
    "/posts",
    async (url) => {
      const res = await fetch(`http://localhost:4000${url}`);
      // setCloseModal(undefined)
      return res.json();
    }
  );

  const onClose = () => {
    refetch();
  };

  const addModal = () => {
    sweetModal({
      html: postFormElement(onClose) as HTMLElement,
    });
  };

  const editModal = (post: Post) => {
    sweetModal({
      html: postFormElement(onClose, post) as HTMLElement,
      showConfirmButton: true,
    });
  };

  const modalDelete = async (id: string) => {
    sweetModal({
      title: "Esta acción es irreversible",
      text: "Se eliminara la publicación",
      cancelButtonText: "Cancelar",
      showCancelButton: true,
      icon: "warning",
      confirmButtonText: "Confirmar",
    }).then(({ isConfirmed }) => {
      if (isConfirmed) {
        fetch(`http://localhost:4000/posts/${id}`, {
          method: "DELETE",
        }).then((res) => res.json());

        refetch();
      }
    });
  };

  return (
    <>
      <h1 className="text-4xl font-bold leading-loose">
        Blog useQuery, react-hook-form, valibot, sweet(Modal, Alert)
      </h1>
      <div className="flex items-center justify-between">
        <h2 className="my-2 text-3xl font-semibold">Publicaciones</h2>
        <button
          type="submit"
          class="bg-blue-500 text-white px-3 py-2 rounded-lg"
          aria-label="Add publication"
          onClick={() => addModal()}
        >
          Añadir publicación
        </button>
      </div>
      <div>
        {" "}
        <table className="min-w-full divide-y divide-gray-700">
          <thead>
            <tr>
              <th className="px-6 py-3 text-xs font-medium text-gray-100 uppercase text-start">
                Titulo
              </th>
              <th className="px-6 py-3 text-xs font-medium text-gray-100 uppercase text-start">
                Contenido
              </th>
              <th className="px-6 py-3 text-xs font-medium text-gray-100 uppercase text-start">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {posts?.map((post) => (
              <tr key={post.id}>
                <td className="px-6 py-4 text-sm font-medium text-gray-200 whitespace-nowrap">
                  {post.title}
                </td>
                <td className="px-6 py-4 text-sm font-medium text-gray-200 whitespace-nowrap">
                  {post.content}
                </td>
                <td className="flex gap-2 px-6 py-4 text-sm font-medium text-gray-200 whitespace-nowrap">
                  <button
                    type="button"
                    className="px-2 py-1 text-white bg-indigo-500 rounded-lg"
                    onClick={() => {
                      editModal(post);
                    }}
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    className="px-2 py-1 text-white bg-red-500 rounded-lg"
                    onClick={() => modalDelete(post.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default PostsPage;
