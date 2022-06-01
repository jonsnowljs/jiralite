import { QueryKey, useQueryClient } from "react-query";

// the type in useConfig is too complicate, so we will use any as the type. And it wouldn't affect other code, so it should be fine.
export const useConfig = (
  queryKey: QueryKey,
  callback: (target: any, old?: any[]) => any[]
) => {
  const queryClient = useQueryClient();
  return {
    // onSuccess, fire when the mutation is successful invalidate and refetch query `projects`'
    // onMutate, used to create Optimistic update. fire before the mutation, passed the same variables as useMutation.
    onSuccess: () => queryClient.invalidateQueries(queryKey),
    async onMutate(target: any) {
      const previousItems = queryClient.getQueryData(queryKey);
      queryClient.setQueryData(queryKey, (old?: any[]) => {
        return (
          old?.map((project) =>
            project.id === target.id ? { ...project, ...target } : project
          ) || []
        );
      });
      return { previousItems };
    },
    onError(error: any, newItem: any, context: any) {
      queryClient.setQueryData(queryKey, context.previousItems);
    },
  };
};

export const useDeleteConfig = (queryKey: QueryKey) =>
  useConfig(
    queryKey,
    (target, old) => old?.filter((item) => item.id !== target.id) || []
  );

export const useEditConfig = (queryKey: QueryKey) =>
  useConfig(
    queryKey,
    (target, old) =>
      old?.map((item) =>
        item.id === target.id ? {} : { ...item, ...target }
      ) || []
  );
export const useAddConfig = (queryKey: QueryKey) =>
  useConfig(queryKey, (target, old) => (old ? [...old, target] : []));
