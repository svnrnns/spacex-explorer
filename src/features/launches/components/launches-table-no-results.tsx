export function LaunchesTableNoResults() {
  return (
    <tr>
      <td
        colSpan={5}
        className="px-4 py-8 text-center text-placeholder"
      >
        No launches in this result.
      </td>
    </tr>
  );
}
