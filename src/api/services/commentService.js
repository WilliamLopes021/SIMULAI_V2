import userService from "./userService";

export async function getApprovedComments(limit = 6) {
  try {
    const users = await userService.getEvaluationComments();

    const comments = users.flatMap((user) =>
      user.comments
        .filter((com) => com.status === "Aprovado")
        .map((com) => ({
          profileImage: user.profileImage,
          name: user.name,
          title: com.title,
          body: com.body,
          rating: com.rating,
          createdAt: new Date(com.createdAt),
        }))
    );

    const sorted = comments.sort((a, b) => b.createdAt - a.createdAt);

    return sorted.slice(0, limit).map((c) => ({
      ...c,
      createdAt: c.createdAt.toLocaleDateString("pt-BR"),
    }));
  } catch (err) {
    console.error("Erro ao buscar comentários:", err.message);
    return [];
  }
}
