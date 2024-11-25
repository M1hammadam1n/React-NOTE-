import React, { useState } from 'react';
import { Plus, Pencil, Save, X, Trash2 } from 'lucide-react';

interface Note {
  id: string;
  timestamp: string;
  note: string;
  title: string;
}

export default function VideoNotesTable() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newNote, setNewNote] = useState({ timestamp: '', note: '', title: '' });

  const addNote = () => {
    if (newNote.timestamp && newNote.note && newNote.title) {
      setNotes([...notes, { ...newNote, id: Date.now().toString() }]);
      setNewNote({ timestamp: '', note: '', title: '' });
    }
  };

  const updateNote = (id: string, updatedNote: Partial<Note>) => {
    setNotes(notes.map(note => 
      note.id === id ? { ...note, ...updatedNote } : note
    ));
  };

  const deleteNote = (id: string) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 bg-gradient-to-r from-purple-600 to-blue-600">
          <h2 className="text-2xl font-bold text-white">Video Notes</h2>
        </div>
        
        {/* Add Note Form */}
        <div className="p-6 bg-gray-50 border-b">
          <div className="flex flex-wrap gap-4">
            <input
              type="text"
              placeholder="Timestamp (00:00)"
              className="flex-1 min-w-[120px] px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              value={newNote.timestamp}
              onChange={(e) => setNewNote({ ...newNote, timestamp: e.target.value })}
            />
            <input
              type="text"
              placeholder="Title"
              className="flex-1 min-w-[200px] px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              value={newNote.title}
              onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
            />
            <input
              type="text"
              placeholder="Note"
              className="flex-1 min-w-[300px] px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              value={newNote.note}
              onChange={(e) => setNewNote({ ...newNote, note: e.target.value })}
            />
            <button
              onClick={addNote}
              className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Note
            </button>
          </div>
        </div>

        {/* Notes Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Timestamp</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Title</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Note</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {notes.map((note) => (
                <tr key={note.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {editingId === note.id ? (
                      <input
                        type="text"
                        value={note.timestamp}
                        onChange={(e) => updateNote(note.id, { timestamp: e.target.value })}
                        className="w-full px-2 py-1 rounded border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    ) : (
                      note.timestamp
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {editingId === note.id ? (
                      <input
                        type="text"
                        value={note.title}
                        onChange={(e) => updateNote(note.id, { title: e.target.value })}
                        className="w-full px-2 py-1 rounded border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    ) : (
                      note.title
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {editingId === note.id ? (
                      <input
                        type="text"
                        value={note.note}
                        onChange={(e) => updateNote(note.id, { note: e.target.value })}
                        className="w-full px-2 py-1 rounded border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    ) : (
                      note.note
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                    {editingId === note.id ? (
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => setEditingId(null)}
                          className="text-green-600 hover:text-green-700"
                        >
                          <Save className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => setEditingId(null)}
                          className="text-gray-600 hover:text-gray-700"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => setEditingId(note.id)}
                          className="text-blue-600 hover:text-blue-700"
                        >
                          <Pencil className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => deleteNote(note.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
              {notes.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                    No notes yet. Add your first note above!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}