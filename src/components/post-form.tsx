import { useMutation } from "@vigilio/preact-fetching";
import { useForm } from "react-hook-form";
import { maxLength, minLength, object, string, omit, Input } from "valibot";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { sweetAlert } from "@vigilio/sweet";

type Post = {
  id: string;
  title: string;
  content: string;
};

const postSchema = object({
  id: string(),
  title: string([
    minLength(3, "El titulo debe tener al menos 3 caracteres"),
    maxLength(255, "El titulo no puede tener mas de 255 caracteres"),
  ]),
  content: string([
    minLength(15, "El contenido debe tener al menos 15 carateres"),
  ]),
});

const addPostSchema = omit(postSchema, ["id"]);
type AddPost = Input<typeof addPostSchema>;

function PostForm({ post, refetch }: { post?: Post; refetch: any }) {
  const form = useForm<AddPost>({
    resolver: valibotResolver(addPostSchema),
    defaultValues: post || {
      title: "",
      content: "",
    },
  });

  const { mutate } = useMutation<Post, AddPost, { message: string }>(
    "/posts",
    async (url, body) => {
      const res = await fetch(`http://localhost:4000${url}/${post ? post.id : ''}`, {
        method: post ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      refetch()
      return res.json();
    }
  );

  const onSubmit = (data: AddPost) => {
    mutate(data);
    sweetAlert({

    })
  };

  return (
    <div class="w-full">
      <h2 className="mb-4 text-2xl font-semibold">{post ? "Actualizar" : "Añadir"} publicación</h2>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        class="flex flex-col w-full gap-2"
      >
        <input
          type="text"
          placeholder={"Titulo de la publicación"}
          className="block w-full px-4 py-3 text-sm border-gray-200 rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
          {...form.register("title")}
        />
        <span class="text-sm font-medium text-red-500">
          {form.formState.errors.title
            ? form.formState.errors.title.message
            : null}
        </span>
        <textarea
          rows={5}
          placeholder={"Contenido de la publicación"}
          className="block w-full px-4 py-3 text-sm border-gray-200 rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
          {...form.register("content")}
        ></textarea>
        <span class="text-sm font-medium text-red-500">
          {form.formState.errors.content
            ? form.formState.errors.content.message
            : null}
        </span>
        <button
          type="submit"
          class="bg-blue-500 text-white px-3 py-2 rounded-lg"
          aria-label="Add publication"
        >
          {post ? "Actualizar publicación" : "Añadir publicación"}
        </button>
      </form>
    </div>
  );
}

export default PostForm;
