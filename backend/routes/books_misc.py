from flask import jsonify, request
from app import app, books_collection , token_required

# Rota para apagar um livro pelo ID respetivo
# Necessário autenticação @token_required
@app.route("/api/v1/books/<int:id>", methods=["DELETE"])
#@token_required
def delete_book_by_id(id):

    result = books_collection.delete_one({"id": id})

    if result.deleted_count == 0:
        return jsonify({"message": "Error", "status": "Book not found"}), 404

    return jsonify({"message": "Success", "status": "Book deleted"}), 200

@app.route("/api/v1/books", methods=["POST"])
@token_required
def add_new_books():
    books_data = request.get_json()
    print(books_data)
    if not isinstance(books_data, list):
        return jsonify({"message": "A list of books is required"}), 400

    for book_data in books_data:
        if "_id" in book_data:
            return jsonify({"message": "field '_id' is reserved",
                            "invalid book": book_data}), 400
        if not "id" in book_data:
            return jsonify({"message": "id is required",
                            "invalid book": book_data}), 400
        if not isinstance(book_data["id"], int):
            return jsonify({"message": "id must be numeric",
                            "invalid book": book_data}), 400
        elif books_collection.find_one({"id": book_data["id"]}):
            return jsonify({"message": "id must be unique",
                            "invalid book": book_data}), 400

    books_collection.insert_many(books_data)
    return jsonify({'message': 'Success', 'status': 'Books added successfully'}), 200



