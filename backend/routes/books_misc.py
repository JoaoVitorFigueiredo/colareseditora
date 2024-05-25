from flask import jsonify
from app import app, books_collection , token_required

# Rota para apagar um livro pelo ID respetivo
# Necessário autenticação @token_required
@app.route("/api/v1/books/<string:id>", methods=["DELETE"])
@token_required
def delete_book_by_id(id):

    result = books_collection.delete_one({"id": id})

    if result.deleted_count == 0:
        return jsonify({"message": "Error", "status": "Book not found"}), 404

    return jsonify({"message": "Success", "status": "Book deleted"}), 200