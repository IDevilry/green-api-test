import { fetcher } from ".";

export async function deleteNotification(id: string): Promise<void> {
  await fetcher.delete<{ result: boolean }>(
    `/waInstance${localStorage.getItem(
      "idInstance"
    )}/deleteNotification/${localStorage.getItem("apiToken")}/${id}`
  );
}
